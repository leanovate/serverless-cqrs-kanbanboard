import {Aggregate} from 'cqrs/aggregate';
import {createTaskCommandHandler, createTaskCommand} from 'cqrs/task/write';

const taskAggregate = new Aggregate();
taskAggregate.registerCommandHandler(createTaskCommandHandler);

module.exports.createTask = async (event, context, callback) => {
    console.log(`Entered createTask with: ${JSON.stringify(event)}, ${JSON.stringify(context)}`);
    // create a response
    let response = {
        statusCode: 202,
        body: ''
    };

    if (event.httpMethod === 'POST') {
        const payload = JSON.parse(event.body);
        const command = createTaskCommand(payload.name);
        console.log(`created createTaskCommand: ${JSON.stringify(command)}`);
        try {
            let event = await taskAggregate.handleCommand(command);
            response.body = JSON.stringify(event);
        } catch (err) {
            response.statusCode = 503;
            response.body = JSON.stringify(err)
        }
    }
    callback(null, response);
    return
};
