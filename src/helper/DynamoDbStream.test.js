import {recordsToEvents} from './DynamoDbStream';

const EVENT_ID = "5228bfda-11b0-423c-9bb8-173004825149";
const EVENT_EVENT = "createTask";
const EVENT_TYPE = "event";
const EVENT_PAYLOAD_NAME = "foo";
const EVENT_PAYLOAD_ID = "0f19b5c0-1269-4f7f-b8df-b23a23c16d8d";
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
                        "S": `${EVENT_ID}`
                    }
                },
                "NewImage": {
                    "payload": {
                        "M": {
                            "name": {
                                "S": `${EVENT_PAYLOAD_NAME}`
                            },
                            "id": {
                                "S": `${EVENT_PAYLOAD_ID}`
                            }
                        }
                    },
                    "id": {
                        "S": `${EVENT_ID}`
                    },
                    "event": {
                        "S": `${EVENT_EVENT}`
                    },
                    "type": {
                        "S": `${EVENT_TYPE}`
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
    const event = recordsToEvents(eventFixture.Records);
    expect(EVENT_ID).toBe(EVENT_ID);
    expect(EVENT_EVENT).toBe(EVENT_EVENT);
    expect(EVENT_TYPE).toBe(EVENT_TYPE);
    expect(EVENT_PAYLOAD_NAME).toBe(EVENT_PAYLOAD_NAME);
    expect(EVENT_PAYLOAD_ID).toBe(EVENT_PAYLOAD_ID);
});