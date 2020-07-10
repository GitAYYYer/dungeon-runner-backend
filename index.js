// Express Server variables
const express = require('express');
const app = express();
const port = 3001;

// DynamoDB variables
const AWS = require('aws-sdk');
AWS.config.update({
    region: "ap-southeast-2",
});
const dbClient = new AWS.DynamoDB.DocumentClient();

const handleGet = (request, response) => {
    console.log('Inside handleGet')
    let params = {
        TableName: "users",
        Key: {
            "DiscordId": '123',
        }
    }

    console.log('Before dbClient');
    dbClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            response.send(JSON.stringify(data, null, 2));
        }
    });
    
}

app.get('/', (request, response) => handleGet(request, response));

const handlePost = (request, response) => {
    let reqObj = JSON.stringify(request);
    console.log(`Request: ${reqObj}`);
    let responseObj = {
        id: '123',
        partyId: '456'
    }
    response.send(responseObj);
}

app.post('/create-dungeon', (request, response) => handlePost(request, response));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));