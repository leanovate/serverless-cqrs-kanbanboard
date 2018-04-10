import RedisCache from '../helper/RedisCache';

module.exports.projection = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false

    const CACHE_KEY = 'CACHE_KEY'
    let res = {}
    let checkCache = await RedisCache.get(CACHE_KEY)
    if (checkCache) {
        res = checkCache
    } else {
        await RedisCache.set(CACHE_KEY, {'message': 'Hello World!'})
        res = {'message': 'Set cache success!'}
    }
    const response = {
        statusCode: 200,
        body: JSON.stringify(res)
    }
    callback(null, response);
    /*
      let client;
      try {
        client = require('redis').createClient(6379, 'readcache.cg0t9q.0001.euc1.cache.amazonaws.com', {no_ready_check: true});
        console.log("Connection to Redis with client was successfull");


        console.log(`Going to save event ${JSON.stringify(event)}`);
        const body = event.Records[0].dynamodb.NewImage;
        const key = body.id.S;

        client.set(key, JSON.stringify(body), (error) => {
            // handle potential errors
            if (error) {
                console.error(error);
                return;
            }

            console.log(`Projected into view cache key: ${key} body: ${JSON.stringify(body)}`);


            client.get(key, (error, data) => {
                // handle potential errors
                if (error) {
                    console.error(error);
                    return;
                }

                console.log(`Fetched for key: ${key} data: ${JSON.stringify(data)}`);

                client.quit();

                const response = {
                  statusCode: 200,
                  body: "Connection to Redis with client was successfull",
                };
                callback(null, response);
            });

        });

      } catch(e) {
        console.error("Cannot connect to Redis with client");
        console.error(e);

        const response = {
          statusCode: 500,
          body: JSON.stringify(e),
        };
        callback(null, response);

      }
    */
}