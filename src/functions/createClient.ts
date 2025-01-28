import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { CreateClientRequest, Client } from '../types';

function generateClientId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${random}`;
}

const dynamoDb = new DynamoDB.DocumentClient();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const requestBody: CreateClientRequest = JSON.parse(event.body || '{}');

    const client: Client = {
        clientId: generateClientId(),
        ...requestBody,
    };

    await dynamoDb
        .put({
            TableName: process.env.CLIENTS_TABLE!,
            Item: client,
        })
        .promise();

    return {
        statusCode: 201,
        body: JSON.stringify(client),
    };
};