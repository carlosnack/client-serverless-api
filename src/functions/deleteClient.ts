import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient({ region: process.env.AWS_REGION });

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const clientId = event.pathParameters?.clientId;

  await dynamoDb
    .delete({
      TableName: process.env.CLIENTS_TABLE!,
      Key: { clientId },
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Client deleted successfully' }),
  };
};