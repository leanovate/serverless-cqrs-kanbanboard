import {recordsToEvents} from 'lambda-handlers/task/projections';

const eventFixture = {
    "Records": [
        {
            "eventID": "465d7fa329d02d35d5c489633daec349",
            "eventName": "INSERT",
            "eventVersion": "1.1",
            "eventSource": "aws:dynamodb",
            "awsRegion": "eu-central-1",
            "dynamodb": {
                "ApproximateCreationDateTime": 1524151440,
                "Keys": {
                    "id": {
                        "S": "5228bfda-11b0-423c-9bb8-173004825149"
                    }
                },
                "NewImage": {
                    "payload": {
                        "M": {
                            "name": {
                                "S": "foo"
                            },
                            "id": {
                                "S": "0f19b5c0-1269-4f7f-b8df-b23a23c16d8d"
                            }
                        }
                    },
                    "id": {
                        "S": "5228bfda-11b0-423c-9bb8-173004825149"
                    },
                    "event": {
                        "S": "createdTask"
                    },
                    "type": {
                        "S": "event"
                    }
                },
                "SequenceNumber": "400000000000714578120",
                "SizeBytes": 158,
                "StreamViewType": "NEW_IMAGE"
            },
            "eventSourceARN": "arn:aws:dynamodb:eu-central-1:173671960409:table/Kanbanboard-dev-events/stream/2018-04-19T12:53:15.363"
        }
    ]
};

test('Expect recordsToEvents to return a list of events (happy path)', () => {
    console.log(JSON.stringify(recordsToEvents(eventFixture.Records)))
    expect(recordsToEvents(eventFixture.Records)).toHaveLength(1);
});