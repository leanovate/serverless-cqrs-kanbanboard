import RedisCache from 'helper/RedisCache';

const taskModelKeyPrefix = 'task:';

export class TaskModel {
    get(id) {
        return RedisCache.get(keyForId(id));
    }

    set(id, name) {
        return RedisCache.set(keyForId(id), name);
    }
}

const keyForId = (id) => {
    return `${taskModelKeyPrefix}${id}`;
};