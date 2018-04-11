'use strict';
import readdirp from 'readdirp';

module.exports.logdb = (event, context, callback) => {
    console.log(JSON.stringify(event));
    console.log("id: " + event.Records[0].dynamodb.NewImage.id.S);
};


module.exports.listfiles = (event, context, callback) => {
    readdirp(
        { root: `${process.cwd()}/src`, fileFilter: '*.js', depth: 2}
        , function(fileInfo) {
            // do something with file entry here
        }
        , function (err, res) {
            console.log(`Files found: ${JSON.stringify(res)} err: ${JSON.stringify(err)}`);
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(res)
            });
            return;
        }
    );
};