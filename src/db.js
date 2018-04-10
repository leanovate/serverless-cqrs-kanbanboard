import uuid from 'uuid';
import AWS from 'aws-sdk';

// init DynamoDB connection during cold start
// TODO: add error handling for connection loss etc.
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
