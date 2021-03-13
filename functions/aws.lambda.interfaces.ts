
export interface LambdaEvent {
    resource: string;
    path: string;
    httpMethod: string;
    headers: any;
    queryStringParameters: any;
    pathParameters: any;
    /**
     * Applicable stage variables
     */
    stageVariables: any;
    /**
     * Request context, including authorizer-returned key-value pairs, requestId, sourceIp, etc.
     */
    requestContext: any;
    /**
     * A JSON string of the request payload. 
     */
    body: string;
}

export interface LambdaContext {
    /**
     * Cloudwatch Log Group name
     */
    logGroupName: string;
    /**
     * Cloudwatch Log stream name
     */
    logStreamName: string;
    /**
     * Lambda function name
     */
    functionName: string;
    memoryLimitInMB: string;
    unctionVersion: string;
    /**
     * Time in milliseconds before function times out
     */
    getRemainingTimeInMillis: () => number;
    awsRequestId: string;
    invokedFunctionArn: string;
}

/**
 * API Gateway Lambda Proxy Output Format
 * https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 */
export interface LambdaReturn {
    /**
     * A boolean flag to indicate if the applicable payload is Base64-encode (binary support)
     */
    isBase64Encoded?: boolean;
    /**
     * HTTP Status Code to be returned to the client
     */
    statusCode: number;
    /**
     * HTTP Headers to be returned
     */
    headers?: any;
    /**
     * JSON Payload to be returned
     */
    body?: string;
}

export type LambdaFn = (event: LambdaEvent, context: LambdaContext) => Promise<LambdaReturn>;
