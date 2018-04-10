module.exports = require('cqrs-domain').defineEvent({
    name: 'taskCreated'
}, function(data, aggregate) {
    aggregate.set(data);
});