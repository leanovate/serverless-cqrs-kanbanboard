'use strict';

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.db = (event, context, callback) => {
  const timestamp = new Date().getTime();

  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 15; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      text: text,
      checked: false,
      timestamp: `${timestamp}`,
      timestampSorted: timestamp,
    },
  };

  // write the todo to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: `Couldn't put item ${text}`,
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};

module.exports.logdb = (event, context, callback) => {
    console.log(JSON.stringify(event));
    console.log("id: " + event.Records[0].dynamodb.NewImage.id.S);
};

module.exports.projection = (event, context, callback) => {
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

}
