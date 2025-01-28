import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { UpdateClientRequest } from '../types';

const dynamoDb = new DynamoDB.DocumentClient();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const clientId = event.pathParameters?.clientId;
    const requestBody: UpdateClientRequest = JSON.parse(event.body || '{}');

    await dynamoDb
        .update({
            TableName: process.env.CLIENTS_TABLE!,
            Key: { clientId },
            UpdateExpression:
                'SET fullName = :fullName, birthDate = :birthDate, isActive = :isActive, addresses = :addresses, contacts = :contacts',
            ExpressionAttributeValues: {
                ':fullName': requestBody.fullName,
                ':birthDate': requestBody.birthDate,
                ':isActive': requestBody.isActive,
                ':addresses': requestBody.addresses,
                ':contacts': requestBody.contacts,
            },
            ReturnValues: 'ALL_NEW',
        })
        .promise();

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Client updated successfully' }),
    };
};