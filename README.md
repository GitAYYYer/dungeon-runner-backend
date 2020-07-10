# webpage-backend
NodeJS express server to support webpage

## Setup
Create a folder '.aws' in your home directory (C:/Users/YourUserName/.aws), and then create a file named 'credentials', **but do not give it a file extension (so it is just called 'credentials').
Then edit the credentials file, and paste the following:
`
[default] ; default profile
aws_access_key_id = <DEFAULT_ACCESS_KEY_ID>
aws_secret_access_key = <DEFAULT_SECRET_ACCESS_KEY>
`
Replace <DEFAULT_ACCESS_KEY_ID> with the access key provided with your IAM user, as well as <DEFAULT_SECRET_ACCESS_KEY> with the provided secret access key with your IAM user.

Make sure you have 'express' and 'aws-sdk' packages installed (via npm or yarn).

## Running
Simply run the command 'node .' in the root directory. If you have 'Example app listening at http://localhost:3001' logged into console, then it is ready.