import {recordsToEvents} from 'helper/DynamoDbStream';
import {Aggregate} from 'cqrs/aggregate';
import {createdTaskEventHandler} from 'cqrs/task/read';

export const addReadableTask = async (event, context, callback) => {
    console.log(`addReadableTask event: ${JSON.stringify(event)}`);
    context.callbackWaitsForEmptyEventLoop = false;

    if (!!!event.Records) {
        callback(null, null);
        return;
    }

    const readTaskAggregate = readTaskAggregateFactory();

    const events = recordsToEvents(event.Records);

    console.log(`events: ${JSON.stringify(events)}`);

    for (let event of events) {
        console.log(`applying: ${JSON.stringify(event)} for ${JSON.stringify(readTaskAggregate)}`);
        await readTaskAggregate.handleEvent(event);
    }

    callback(null, null);
};

const readTaskAggregateFactory = () => {
    const aggregate = new Aggregate();
    aggregate.registerEventHandler(createdTaskEventHandler);
    return aggregate;
};
