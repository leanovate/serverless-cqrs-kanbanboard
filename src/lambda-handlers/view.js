import RedisCache from '../helper/RedisCache';

module.exports.view = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false

    const CACHE_KEY = 'CACHE_KEY'
    let res = {}
    let checkCache = await RedisCache.get(CACHE_KEY)
    if (checkCache) {
        res = checkCache
    } else {
        res = {'message': 'View entity not found'}
    }
    const response = {
        statusCode: 200,
        body: JSON.stringify(res)
    }
    callback(null, response);
}