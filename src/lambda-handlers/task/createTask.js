import {TaskAggregate, createTaskCommandHandler, createTaskCommand} from 'cqrs/aggregate';

const taskAggregate = new TaskAggregate();
taskAggregate.registerCommandHandler(createTaskCommandHandler);

module.exports.createTask = (event, context, callback) => {
    console.log(`Entered createTask with: ${JSON.stringify(event)}, ${JSON.stringify(context)}`);
    // create a response
    let response = {
        statusCode: 200,
        body: ":-)",
    };

    if (event.httpMethod === 'POST') {
        const payload = event.body;
        const command = createTaskCommand(payload.name);
        console.log(`created createTaskCommand: ${JSON.stringify(command)}`);
        taskAggregate.handleCommand(command);
    }
    console.log(`calling callback`);
    callback(null, response);
    return
};
