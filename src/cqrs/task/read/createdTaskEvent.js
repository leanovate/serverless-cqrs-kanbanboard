import {EVENT_NAME_CREATED_TASK} from 'cqrs/task/common';
import {TaskModel} from 'cqrs/task/read/models';

const tasks = new TaskModel();

export const createdTaskEventHandler = {
    event: EVENT_NAME_CREATED_TASK,
    handler: async (event) => {
        await tasks.set(event.payload.id, event.payload.name);
    }
};