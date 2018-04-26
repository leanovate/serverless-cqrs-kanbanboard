import uuid from 'uuid/v4';
import {createdTaskEvent} from 'cqrs/task/write';
import {COMMAND_NAME_CREATE_TASK} from 'cqrs/task/common';

export const createTaskCommandHandler = {
    command: COMMAND_NAME_CREATE_TASK,
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
        command: COMMAND_NAME_CREATE_TASK,
        payload: {
            id: uuid(),
            name: name
        },
    }
};