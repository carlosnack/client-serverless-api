import { handler } from '../deleteClient';
import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('deleteClient', () => {
    beforeAll(() => {
        AWSMock.setSDKInstance(AWS);
        AWSMock.mock('DynamoDB.DocumentClient', 'delete', (params: any, callback: Function) => {
            callback(null, {});
        });
    });

    afterAll(() => {
        AWSMock.restore('DynamoDB.DocumentClient');
    });

    it('deve retornar status 200 e mensagem de sucesso', async () => {
        const event: APIGatewayProxyEvent = {
            pathParameters: {
                clientId: '123',
            },
        } as any;

        process.env.CLIENTS_TABLE = 'ClientsTable';

        const response = await handler(event);

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).message).toBe('Client deleted successfully');
    });
});