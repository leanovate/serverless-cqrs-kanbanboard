import uuid from 'uuid/v4';
import {createdTaskEvent} from 'cqrs/task/write';

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