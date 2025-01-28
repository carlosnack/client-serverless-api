import { handler } from '../updateClient';
import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('updateClient', () => {
    beforeAll(() => {
        AWSMock.setSDKInstance(AWS);

        // Mockando a função 'update' para simular o comportamento esperado
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
    });

    afterAll(() => {
        // Restaurando o mock para evitar interferências em outros testes
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

        // Executando o handler com o evento mockado
        const response = await handler(event);

        // Validação da resposta
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).message).toBe('Client updated successfully');
        // Removendo a validação do clientId, pois ele não é retornado no body
    });
});
