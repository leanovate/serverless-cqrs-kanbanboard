import AWS from 'aws-sdk';

export const recordsToEvents = (records) => {
    return records
        .filter((record) => !!(record.dynamodb) && !!(record.dynamodb.NewImage))
        .map((record) => record.dynamodb.NewImage)
        .map((newImage) => AWS.DynamoDB.Converter.unmarshall(newImage));
};