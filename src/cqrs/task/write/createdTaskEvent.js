import uuid from 'uuid/v4';

export const createdTaskEvent = (payload) => {
    return {
        type: 'event',
        id: uuid(),
        event: 'createdTask',
        payload: payload,
    }
};