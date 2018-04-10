module.exports = require('cqrs-domain').defineCommand({
    name: 'createTask'
}, function (data, aggregate) {
    aggregate.apply('taskCreated', data);
});