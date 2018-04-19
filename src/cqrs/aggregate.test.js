import uuid from 'uuid/v4';
import {Aggregate} from 'cqrs/aggregate';
import {createTaskCommandHandler, createTaskCommand, createdTaskEvent} from 'cqrs/task/write';

test('Expect Aggregate to initialize with a empty registeredCommandHandlers map', () => {
   const ta = new Aggregate();
   const actualNumOfKeys = ta.registeredCommandHandlers.size;
   expect(actualNumOfKeys).toBe(0);
});

test('Expect Aggregate to accept a command handler via registerCommandHandler', () => {
    const ta = new Aggregate();
    const expectedCommandHandler = createTaskCommandHandler;

    ta.registerCommandHandler(expectedCommandHandler);

    const actualCommandHandler = ta.registeredCommandHandlers.get(expectedCommandHandler.command);
    expect(ta.registeredCommandHandlers.size).toBe(1);
    expect(actualCommandHandler).toBe(expectedCommandHandler.handler);
});

test('Expect Aggregate.handleCommand to return a promise for handleCommand', () => {
    const ta = new Aggregate();

    expect(ta.handleCommand(createTaskCommand('foo'))).rejects.toBeDefined();
});

test('Expect Aggregate.handleCommand to save an event after running command handler successfully', async () => {
    const TASK_NAME = 'foo';
    let storeEventMock = jest.fn();
    const expectedGeneratedEvent = createdTaskEvent({id: uuid(), name: TASK_NAME});
    Aggregate.prototype.storeEvent = storeEventMock;
    const ta = new Aggregate();
    ta.registerCommandHandler(createTaskCommandHandler);

    await ta.handleCommand(createTaskCommand(TASK_NAME));

    const actualGeneratedEvent = storeEventMock.mock.calls[0][0];
    expect(actualGeneratedEvent.type).toBe(expectedGeneratedEvent.type);
    expect(actualGeneratedEvent.event).toBe(expectedGeneratedEvent.event);
    expect(actualGeneratedEvent.payload.name).toBe(expectedGeneratedEvent.payload.name);
    expect(actualGeneratedEvent.payload.id).toBeDefined();
});
