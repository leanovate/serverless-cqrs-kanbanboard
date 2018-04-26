import uuid from 'uuid/v4';
import {Aggregate} from 'cqrs/aggregate';
import {createTaskCommandHandler, createTaskCommand, createdTaskEvent} from 'cqrs/task/write';
import {createdTaskEventHandler} from 'cqrs/task/read';

test('Expect Aggregate to initialize with a empty registeredCommandHandlers & empty registeredEventHandlers map', () => {
   const ta = new Aggregate();
   const registeredCommandHandlers = ta.registeredCommandHandlers.size;
    const registeredEventHandlers = ta.registeredCommandHandlers.size;
   expect(registeredCommandHandlers).toBe(0);
   expect(registeredEventHandlers).toBe(0);
});

test('Expect Aggregate to accept a command handler via registerCommandHandler', () => {
    const ta = new Aggregate();
    const expectedCommandHandler = createTaskCommandHandler;

    ta.registerCommandHandler(expectedCommandHandler);

    const actualCommandHandler = ta.registeredCommandHandlers.get(expectedCommandHandler.command);
    expect(ta.registeredCommandHandlers.size).toBe(1);
    expect(actualCommandHandler).toBe(expectedCommandHandler.handler);
});

test('Expect Aggregate to accept a event handler via registerEventHandler', () => {
    const ta = new Aggregate();
    const expectedEventHandler = createdTaskEventHandler;

    ta.registerEventHandler(expectedEventHandler);

    const actualEventHandler = ta.registeredEventHandlers.get(expectedEventHandler.event);
    expect(ta.registeredEventHandlers.size).toBe(1);
    expect(actualEventHandler).toBe(expectedEventHandler.handler);
});

test('Expect Aggregate.handleCommand to return a promise for handleCommand', () => {
    const ta = new Aggregate();

    expect(ta.handleCommand(createTaskCommand('foo'))).rejects.toBeDefined();
});

test('Expect Aggregate.handleEvent to return a promise for handleEvent', () => {
    const ta = new Aggregate();

    expect(ta.handleEvent(createdTaskEvent({name: 'foo'}))).rejects.toBeDefined();
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

test('Expect Aggregate.handleEvent to be successful using the happy path', async () => {
    const TASK_NAME = 'foo';
    let mockEventHandler = jest.fn();
    let mockCreatedTaskEventHandler = createdTaskEventHandler;
    mockCreatedTaskEventHandler.handler = mockEventHandler;
    const expectedGeneratedEvent = createdTaskEvent({id: uuid(), name: TASK_NAME});
    const ta = new Aggregate();
    ta.registerEventHandler(createdTaskEventHandler);

    await ta.handleEvent(expectedGeneratedEvent);

    const actualPassedEvent = mockEventHandler.mock.calls[0][0];
    expect(actualPassedEvent.type).toBe(expectedGeneratedEvent.type);
    expect(actualPassedEvent.event).toBe(expectedGeneratedEvent.event);
    expect(actualPassedEvent.payload.name).toBe(expectedGeneratedEvent.payload.name);
    expect(actualPassedEvent.payload.id).toBeDefined();
});
