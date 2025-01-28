import { handler } from '../createClient';
import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('updateClient', () => {
    let mockDynamoDb: AWS.DynamoDB.DocumentClient;

    beforeAll(() => {
        // Configurando o mock do DynamoDB
        AWSMock.setSDKInstance(AWS);
        AWSMock.mock('DynamoDB.DocumentClient', 'update', (params: any, callback: Function) => {
            callback(null, {
                Attributes: {
                    clientId: '123',
                    fullName: 'João da Silva',
                    birthDate: '1990-05-15',
                    isActive: true,
                    addresses: ['Rua das Flores, 123'],
                    contacts: [
                        {
                            email: 'joao.silva@example.com',
                            phone: '+5511999999999',
                            isPrimary: true,
                        },
                    ],
                },
            });
        });
        mockDynamoDb = new AWS.DynamoDB.DocumentClient();
    });

    afterAll(() => {
        AWSMock.restore('DynamoDB.DocumentClient');
    });

    it('deve retornar status 200 e mensagem de sucesso', async () => {
        const event: APIGatewayProxyEvent = {
            pathParameters: {
                clientId: '123',
            },
            body: JSON.stringify({
                fullName: 'João da Silva',
                birthDate: '1990-05-15',
                isActive: true,
                addresses: ['Rua das Flores, 123'],
                contacts: [
                    {
                        email: 'joao.silva@example.com',
                        phone: '+5511999999999',
                        isPrimary: true,
                    },
                ],
            }),
        } as any;

        process.env.CLIENTS_TABLE = 'ClientsTable';

        const response = await handler(event); // Passando o mock como dependência

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).message).toBe('Client updated successfully');
    });
});
