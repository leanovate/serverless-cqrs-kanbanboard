import {recordsToEvents} from 'helper/DynamoDbStream';

export const addReadableTask = async (event, context, callback) => {
    console.log(`addReadableTask event: ${JSON.stringify(event)}`);
    context.callbackWaitsForEmptyEventLoop = false;

    /*
    const CACHE_KEY = 'CACHE_KEY';
    let res = {};
    let checkCache = await RedisCache.get(CACHE_KEY);
    if (checkCache) {
        res = checkCache
    } else {
        await RedisCache.set(CACHE_KEY, {'message': 'Hello World!'});
        res = {'message': 'Set cache success!'}
    }
    const response = {
        statusCode: 200,
        body: JSON.stringify(res)
    };
    */


    if (!!!event.Records) {
        callback(null, null);
        return;
    }

    const events = recordsToEvents(event.Records);

    console.log(`events: ${JSON.stringify(events)}`);

    callback(null, null);
};
