import { handler } from '../getClient';
import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('getClient', () => {
    beforeAll(() => {
        AWSMock.setSDKInstance(AWS);
        AWSMock.mock('DynamoDB.DocumentClient', 'get', (params: any, callback: Function) => {
            callback(null, {
                Item: {
                    clientId: '123',
                    fullName: 'João da Silva',
                    isActive: true,
                },
            });

        });
    });

    afterAll(() => {
        AWSMock.restore('DynamoDB.DocumentClient');
    });

    it('deve retornar status 200 e os dados do cliente', async () => {
        const event: APIGatewayProxyEvent = {
            pathParameters: {
                clientId: '123',
            },
        } as any;

        process.env.CLIENTS_TABLE = 'ClientsTable';

        const response = await handler(event);

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).clientId).toBe('123');
    });

    it('deve retornar status 404 se o cliente não for encontrado', async () => {
        AWSMock.remock('DynamoDB.DocumentClient', 'get', (params: any, callback: Function) => {
            callback(null, {});
        });

        const event: APIGatewayProxyEvent = {
            pathParameters: {
                clientId: '456',
            },
        } as any;

        const response = await handler(event);

        expect(response.statusCode).toBe(404);
        expect(JSON.parse(response.body).message).toBe('Client not found');
    });
});