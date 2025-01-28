import { handler } from '../listClients';
import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('listClients', () => {
    beforeAll(() => {
        AWS.config.update({ region: 'us-east-1' });
        AWSMock.setSDKInstance(AWS);

        AWSMock.mock('DynamoDB.DocumentClient', 'put', (params: any, callback: Function) => {
            console.log('Mock de scan chamado com params:', params);
            callback(null, {
                Items: [
                    {
                        clientId: '123',
                        fullName: 'João da Silva',
                        isActive: true,
                    },
                ],
            });
        });
    });

    afterAll(() => {
        AWSMock.restore('DynamoDB.DocumentClient');
    });

    it('deve retornar status 200 e uma lista de clientes', async () => {
        const event: APIGatewayProxyEvent = {} as any;

        process.env.CLIENTS_TABLE = 'ClientsTable';
        process.env.AWS_REGION = 'us-east-1'; // Certifique-se de definir a região
        console.log('TableName usada:', process.env.CLIENTS_TABLE);

        const response = await handler(event);

        console.log('Resposta do handler:', response);

        expect(response.statusCode).toBe(200);
        const body = JSON.parse(response.body);
        expect(body.length).toBe(1); // O array deve conter um item
        expect(body[0].clientId).toBe('123'); // Verificando se o cliente retornado é o correto
    });
});
