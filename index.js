// Express Server variables
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
app.use(bodyParser.json());

// DynamoDB variables
const AWS = require('aws-sdk');
AWS.config.update({
    region: "ap-southeast-2",
});
const dbClient = new AWS.DynamoDB.DocumentClient();

const isEmpty = (obj) => {
    return !Object.keys(obj).length;
}

/*
Gets partyId param (request.query.partyId) and checks if the party already has an active dungeon in the DB.
*/
const checkPartyDungeon = async (request, response) => {
    const partyId = request.query.partyId;
    const activeDungeonParams = {
        TableName: "active-dungeons",
        Key: {
            partyId: partyId
        }
    }

    const data = await dbClient.get(activeDungeonParams).promise();

    // If data is empty, party is not in a dungeon and return status OK
    if (isEmpty(data)) {
        response.status(200).send(`Party with ID: ${partyId} is not currently in a dungeon.`);
    } else {
        response.status(409).send(`Party with ID: ${partyId} has an active running dungeon.`);
    }
}

app.get('/check-party-dungeon', (request, response) => checkPartyDungeon(request, response));

/*
Request will contain: PartyID, DiscordID, an object that contains ID's of all members of the party
NOTE: You do not need to check the caller is party leader; this should already be checked by the DiscordBot code.
NOTE: You do not need to check the partyId is already doing a dungeon; this should already be checked by the DiscordBot code (it calls the GET method of check-active-dungeon)
*/
const handlePost = async (request, response) => {
    const body = request.body;
    const newDungeonParams = {
        TableName: "active-dungeons",
        Item: {
            partyId: body.partyId,
            partyMembers: body.partyMembers
        }
    }
    await dbClient.put(newDungeonParams).promise();
    response.status(200).send('SENT OK');
}

app.post('/create-dungeon', (request, response) => handlePost(request, response));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));