import uuid from 'uuid/v4';
import {EVENT_NAME_CREATED_TASK} from 'cqrs/task/common';

export const createdTaskEvent = (payload) => {
    return {
        type: 'event',
        id: uuid(),
        event: EVENT_NAME_CREATED_TASK,
        payload: payload,
    }
};