import {EVENT_NAME_CREATED_TASK} from 'cqrs/task/common';

export const createdTaskEventHandler = {
    event: EVENT_NAME_CREATED_TASK,
    handler: (event) => {
        // TODO: deal with model updates here
        console.log(`This should update ${JSON.stringify(event)}`);
    }
};