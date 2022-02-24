# adakerja

## Working Demo of Facebook Messenger Bot
https://user-images.githubusercontent.com/51758104/155595159-cff7c48d-671a-44cb-8aff-e45b968630d0.mp4


## For RestAPI

- To download and test on your local
  - On Local
    - Clone the repository
    - Create a new .env file and copy the contents of .env.example from repository and populate the correct values in environment variables
    - Run the command npm run dev / npm run start
      - Endpoints:
        - /messages - GET
        - /summary - GET
        - /message/:mid - GET
  - For Sample Online Demo
    - Description: I have hosted the project in heroku and used MongoDb Atlas as the database
    - For Sample request: Please refer curl.txt in the root directory
### /messages
<img width="1033" alt=":messages" src="https://user-images.githubusercontent.com/51758104/155602283-5c6e5ef3-dd56-4515-ad63-0753efa41313.png">

### /summary
<img width="1033" alt=":summary" src="https://user-images.githubusercontent.com/51758104/155602294-29dacdd6-e834-4c09-bcc5-650c767f066e.png">

## /message/:mid
<img width="1033" alt=":message:mid" src="https://user-images.githubusercontent.com/51758104/155602309-6aafadcd-eab8-45f2-8b67-a02f7693c061.png">
