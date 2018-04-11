import Redis from 'ioredis'
const DEFAULT_TIMEOUT = 4000;
let cacheClient = null;

// Copied from https://github.com/ittus/aws-lambda-vpc-nat-examples/blob/a508f6a07d67074a8bab4e5822e4509411d60b54/helper/RedisCache.js
if ((!cacheClient) && (typeof process.env.REDIS_ENDPOINT === 'string')) {
    const connectParams = process.env.REDIS_ENDPOINT.split(':');
    console.log('Connecting to redis', connectParams);
    try {
        cacheClient = new Redis({
            host: connectParams[0],
            port: connectParams[1],
            connectTimeout: 5000,
            reconnectOnError: function (err) {
                console.log('Reconnect on error', err);
                let targetError = 'READONLY';
                if (err.message.slice(0, targetError.length) === targetError) {
                    // Only reconnect when the error starts with "READONLY"
                    return true
                }
            },
            retryStrategy: function (times) {
                console.log('Redis Retry', times);
                if (times >= 3) {
                    return undefined;
                }
                let delay = Math.min(times * 50, 2000);
                return delay
            }
        });
        console.log('Create Redis Client success')
    } catch (error) {
        console.error('Connect to redis failed', error)
    }
}

export default cacheClient;
