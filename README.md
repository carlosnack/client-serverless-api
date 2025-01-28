# Client API Project

This repository contains the implementation of a serverless API for managing client data, including endpoints for creating, retrieving, updating, and deleting client records. The API is built using Node.js and AWS services like API Gateway, Lambda, and DynamoDB.

## Prerequisites

- Node.js version 22 or higher.
- Serverless Framework installed globally.

## Getting Started

### 1. Install the Serverless Framework

```bash
npm i serverless -g
```

### 2. Install Project Dependencies

In the project root directory, run:

```bash
npm install
```

For production-specific dependencies only:

```bash
npm install --production
```

### 3. Set Environment Variables

Export the necessary environment variables. Use the `.env.example` file as a reference. Example command:

```bash
export AWS_REGION=us-east-1
export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=
```

### 4. Deploy the Application

Deploy the serverless application to AWS using the following command:

```bash
serverless deploy
```

If the deployment is successful, you should see output similar to the following:

```plaintext
Deploying "client-api" to stage "dev" (us-east-1)

[!] Function createClient has a timeout of 300 seconds, but it is attached to an API Gateway with a timeout of 29 seconds. 
[!] Function getClient has a timeout of 300 seconds, but it is attached to an API Gateway with a timeout of 29 seconds. 
[!] Function updateClient has a timeout of 300 seconds, but it is attached to an API Gateway with a timeout of 29 seconds. 
[!] Function deleteClient has a timeout of 300 seconds, but it is attached to an API Gateway with a timeout of 29 seconds. 
[!] Function listClients has a timeout of 300 seconds, but it is attached to an API Gateway with a timeout of 29 seconds. 

✔ Service deployed to stack client-api-dev (166s)

endpoints:
  POST - https://xzuvqofh52.execute-api.us-east-1.amazonaws.com/dev/clients
  GET - https://xzuvqofh52.execute-api.us-east-1.amazonaws.com/dev/clients/{clientId}
  PUT - https://xzuvqofh52.execute-api.us-east-1.amazonaws.com/dev/clients/{clientId}
  DELETE - https://xzuvqofh52.execute-api.us-east-1.amazonaws.com/dev/clients/{clientId}
  GET - https://xzuvqofh52.execute-api.us-east-1.amazonaws.com/dev/clients
functions:
  createClient: client-api-dev-createClient (7.1 MB)
  getClient: client-api-dev-getClient (7.1 MB)
  updateClient: client-api-dev-updateClient (7.1 MB)
  deleteClient: client-api-dev-deleteClient (7.1 MB)
  listClients: client-api-dev-listClients (7.1 MB)
```

This deployment sets up the following:
- API Gateway
- AWS Lambda Functions
- DynamoDB Table

## Testing the Application

Run the tests using:

```bash
npm test
```

This command executes tests for all the functions in the application.

## Example Request

### POST `/clients/`

**Request Body:**

```json
{
    "fullName": "Carlos Alberto de Oliveira Nackamura Junior",
    "birthDate": "2025/01/27",
    "isActive": true,
    "addresses": ["Rua 1", "Rua 2"],
    "contacts": [
        {
            "email": "nackinha@unesp.com",
            "phone": "14991310989",
            "isPrimary": true
        },
        {
            "email": "credo@unesp.com",
            "isPrimary": false
        }
    ]
}
```

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
