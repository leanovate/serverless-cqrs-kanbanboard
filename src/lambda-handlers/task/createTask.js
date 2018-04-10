import domain from 'cqrs/domain'

module.exports.createTask = (event, context, callback) => {
    // create a response
    let response = {
        statusCode: 500,
        body: "sorry, something bad happened ;-(",
    };

    if (event.httpMethod === 'POST') {
        const payload = event.body;
        const commandStub = {
            name: 'createTask',
            aggregate: {name: 'task'},
            payload: payload
        };

        domain(commandStub);

        response = {
            statusCode: 200,
            body: JSON.stringify(commandStub),
        };
    }

    callback(null, response);
};
