import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { env } from 'process';

const dynamoDb = new DynamoDB.DocumentClient({ region: env.AWS_REGION });

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const clientId = event.pathParameters?.clientId;

  const result = await dynamoDb
    .get({
      TableName: process.env.CLIENTS_TABLE!,
      Key: { clientId },
    })
    .promise();

  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Client not found' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result.Item),
  };
};