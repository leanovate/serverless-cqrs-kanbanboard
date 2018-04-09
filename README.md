# serverless-cqrs-kanbanboard
Builds a Kanban board backend with CQRS with AWS Lambda 

## AWS setup

Either:

* Create a new aws default profile via:
```
serverless config credentials --provider aws --key <YOUR KEY IN IAM> --secret <YOUR SECRET IN IAM>
```
* Configure the active aws profile via an environment variable: 
```
export AWS_PROFILE=<YOUR PROFILE NAME AS DEFINED IN ~/.aws/config>
```

## Deployment, function invocation & teardown

You may setup the all service as defined in the serverless.yml by executing:
```
serverless deploy
```

You might check which functions are deployed via:
```
serverless deploy list functions
```

Functions can be invoked via the cli as follows:
```
serverless invoke -f <function name> 
```

**NOTE: A deployed stack will incur costs to your aws account!**
Therefore, it is important that you remove the stack after you are done
working with it via:
```
serverless remove
```
