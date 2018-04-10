'use strict';

module.exports.logdb = (event, context, callback) => {
    console.log(JSON.stringify(event));
    console.log("id: " + event.Records[0].dynamodb.NewImage.id.S);
};