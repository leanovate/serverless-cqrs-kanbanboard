import redis from 'redis';

let domain = require('cqrs-domain')({
    // the path to the "working directory"
    // can be structured like
    // [set 1](https://github.com/adrai/node-cqrs-domain/tree/master/test/integration/fixture/set1) or
    // [set 2](https://github.com/adrai/node-cqrs-domain/tree/master/test/integration/fixture/set2)
    domainPath: `${__dirname}/../../foo/lib`,

    // optional, default is 'commandRejected'
    // will be used if an error occurs and an event should be generated
    commandRejectedEventName: 'rejectedCommand',

    // optional, default is 800
    // if using in scaled systems and not guaranteeing that each command for an aggregate instance
    // dispatches to the same worker process, this module tries to catch the concurrency issues and
    // retries to handle the command after a timeout between 0 and the defined value
    retryOnConcurrencyTimeout: 1000,

    // optional, default is 100
    // global snapshot threshold value for all aggregates
    // defines the amount of loaded events, if there are more events to load, it will do a snapshot, so next loading is faster
    // an individual snapshot threshold defining algorithm can be defined per aggregate (scroll down)
    snapshotThreshold: 1000,

    // optional, default is in-memory
    // currently supports: mongodb, redis, tingodb, azuretable and inmemory
    // hint: [eventstore](https://github.com/adrai/node-eventstore#provide-implementation-for-storage)
    eventStore: {
        type: 'dynamodb',
        eventsTableName: process.env.DYNAMODB_TABLE_EVENTS,                  // optional
        snapshotsTableName: process.env.DYNAMODB_TABLE_SNAPSHOTS,            // optional
        undispatchedEventsTableName: process.env.DYNAMODB_TABLE_UNDISPATCHED, // optional
        EventsReadCapacityUnits: 1,                 // optional
        EventsWriteCapacityUnits: 3,                // optional
        SnapshotReadCapacityUnits: 1,               // optional
        SnapshotWriteCapacityUnits: 3,              // optional
        UndispatchedEventsReadCapacityUnits: 1,     // optional
    },

    // optional, default is in-memory
    // currently supports: mongodb, redis, tingodb, couchdb, azuretable and inmemory
    // hint settings like: [eventstore](https://github.com/adrai/node-eventstore#provide-implementation-for-storage)
    aggregateLock: {
        type: 'redis',
        host: process.env.REDIS_HOST,               // optional
        port: process.env.REDIS_PORT,               // optional
        db: 0,                                      // optional
        prefix: 'domain_aggregate_lock',            // optional
        timeout: 10000                              // optional
        // password: 'secret'                       // optional
    },

    // optional, default is not set
    // checks if command was already seen in the last time -> ttl
    // currently supports: mongodb, redis, tingodb and inmemory
    // hint settings like: [eventstore](https://github.com/adrai/node-eventstore#provide-implementation-for-storage)
    deduplication: {
        type: 'redis',
        ttl: 1000 * 60 * 60 * 1, // 1 hour          // optional
        host: process.env.REDIS_HOST,                          // optional
        port: process.env.REDIS_PORT,                                 // optional
        db: 0,                                      // optional
        prefix: 'domain_aggregate_lock',            // optional
        timeout: 10000                              // optional
        // password: 'secret'                          // optional
    }
});

function domainInit() {
    return new Promise(resolve => {
        domain.init((err, warn) => {
            console.log(`domain.init(): err: ${JSON.stringify(err)} warn: ${JSON.stringify(warn)}`);
            resolve();
        });
    })
}

module.exports.createTask = async (event, context, callback) => {
    // create a response
    let response = {
        statusCode: 500,
        body: "sorry, something bad happened ;-(",
    };

    if (event.httpMethod === 'POST') {
        const payload = event.body;
        const commandStub = {
            name: 'createTask',
            aggregate: {name: 'task'},
            payload: payload
        };

        await domainInit();

        domain.handle(commandStub);

        response = {
            statusCode: 200,
            body: JSON.stringify(commandStub),
        };
    }

    callback(null, response);
};
