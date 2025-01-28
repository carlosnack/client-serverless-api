import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { env } from 'process';

const dynamoDb = new DynamoDB.DocumentClient({region: env.AWS_REGION});

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const result = await dynamoDb
        .scan({
            TableName: process.env.CLIENTS_TABLE!,
        })
        .promise();

    return {
        statusCode: 200,
        body: JSON.stringify(result.Items),
    };
};