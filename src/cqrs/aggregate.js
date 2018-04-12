import uuid from 'uuid/v4';
import AWS from 'aws-sdk/index';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export class TaskAggregate {
    constructor() {
        this.registeredCommandHandlers = new Map();
    }

    registerCommandHandler(commandHandler) {
        this.registeredCommandHandlers.set(commandHandler.command, commandHandler.handler);
    }

    handleCommand(command) {
        return new Promise((resolve, reject) => {
            let commandHandler = this.registeredCommandHandlers.get(command.command);
            if (!!!commandHandler) {
                reject("No command handler found!");
                return;
            }
            const event = commandHandler(command);
            resolve(event);
        }).then((event) => {
            return this.storeEvent(event)
        });
    }

    storeEvent(event) {
        console.log(`called storeEvent with event: ${JSON.stringify(event)}`);

        const params = {
            TableName: process.env.DYNAMODB_TABLE_EVENTS,
            Item: event,
        };

        return new Promise((resolve, reject) => dynamoDb.put(params, (error) => {
            // handle potential errors
            if (error) {
                console.error(`Error occured during write of event! details: ${JSON.stringify(error)}`);
                reject(error);
                return;
            }
            resolve(event);
        }));
    }
}

export const createTaskCommandHandler = {
    command: 'createTask',
    handler: (command) => {
        // check if task exists
        // if not create event createdTask && return Promise.resolve()
        // else return Promise.reject()
        return createdTaskEvent(command.payload);
    }
};

export const createTaskCommand = (name) => {
    return {
        type: 'command',
        command: 'createTask',
        payload: {
            id: uuid(),
            name: name
        },
    }
};

export const createdTaskEvent = (payload) => {
    return {
        type: 'event',
        id: uuid(),
        event: 'createdTask',
        payload: payload,
    }
};