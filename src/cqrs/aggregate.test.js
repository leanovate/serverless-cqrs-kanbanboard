import {TaskAggregate, createTaskCommandHandler, createTaskCommand, createdTaskEvent} from './aggregate';

test('Expect TaskAggregate to initialize with a empty registeredCommandHandlers map', () => {
   const ta = new TaskAggregate();
   const actualNumOfKeys = ta.registeredCommandHandlers.size;
   expect(actualNumOfKeys).toBe(0);
});

test('Expect TaskAggregate to accept a command handler via registerCommandHandler', () => {
    const ta = new TaskAggregate();
    const expectedCommandHandler = createTaskCommandHandler;

    ta.registerCommandHandler(expectedCommandHandler);

    const actualCommandHandler = ta.registeredCommandHandlers.get(expectedCommandHandler.command);
    expect(ta.registeredCommandHandlers.size).toBe(1);
    expect(actualCommandHandler).toBe(expectedCommandHandler.handler);
});

test('Expect TaskAggregate.handleCommand to return a promise for handleCommand', () => {
    const ta = new TaskAggregate();

    expect(ta.handleCommand(createTaskCommand('foo'))).rejects.toBeDefined();
});

test('Expect TaskAggregate.handleCommand to save an event after running command handler successfully', async () => {
    const TASK_NAME = 'foo';
    let storeEventMock = jest.fn();
    TaskAggregate.prototype.storeEvent = storeEventMock;

    const ta = new TaskAggregate();
    ta.registerCommandHandler(createTaskCommandHandler);
    await ta.handleCommand(createTaskCommand(TASK_NAME));

    const expectedGeneratedEvent = createdTaskEvent(TASK_NAME);
    const actualGeneratedEvent = storeEventMock.mock.calls[0][0];
    expect(actualGeneratedEvent.type).toBe(expectedGeneratedEvent.type);
    expect(actualGeneratedEvent.event).toBe(expectedGeneratedEvent.event);
    expect(actualGeneratedEvent.name).toBe(expectedGeneratedEvent.name);

});
