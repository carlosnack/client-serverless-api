import { handler } from '../createClient';
import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('createClient', () => {
    beforeAll(() => {
        AWSMock.setSDKInstance(AWS);
        AWSMock.mock('DynamoDB.DocumentClient', 'put', (params: any, callback: Function) => {
            callback(null, {});
        });
    });

    afterAll(() => {
        AWSMock.restore('DynamoDB.DocumentClient');
    });

    it('deve retornar status 201 e o cliente criado', async () => {
        const event: APIGatewayProxyEvent = {
            body: JSON.stringify({
                fullName: "João da Silva",
                birthDate: "1990-05-15",
                isActive: true,
                addresses: ["Rua das Flores, 123"],
                contacts: [
                    {
                        email: "joao.silva@example.com",
                        phone: "+5511999999999",
                        isPrimary: true,
                    },
                ],
            }),
        } as any;

        process.env.CLIENTS_TABLE = 'ClientsTable';

        const response = await handler(event);

        expect(response.statusCode).toBe(201);
        expect(JSON.parse(response.body).fullName).toBe("João da Silva");
    });
});