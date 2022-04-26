# Get Started

### System Requirements

[Node.js 12.22.0](https://nodejs.org/) or later

### DB SetUp

1. Go to the [Firebase site](https://console.firebase.google.com/) and click **Create a project**
2. Under the Build tab on the sidebar, click on **Firestore Database** and then click on **Create database**
3. Click the gear icon next to Project Overview at the top of the sidebar and navigate to Project settings
4. Go to the Service accounts tab and click on **Generate new private key** to generate the JSON file
5. Copy and paste the JSON file into the `utils/db`folder and rename it  `serviceAccountKey.json`

### Install Dependencies

```bash
npm install
#
yarn 
```

### Run the Development Server

```bash
npm run dev
# or
yarn dev
```

open [http://localhost:3000](http://localhost:3000/) in browser



# API Design

Stateless REST APIs for user create and play the game.

- 🌐 POST
**/api/games/create**

cookie: playerId

returns: 
status code 200 - gameId
status code 400 - error


Description: create a new game and return the new gameId

- 🌐 GET
**/api/games/viewGame?id=${id}**

query: gameId
cookie: playerId

returns:
response code: 200 | 400
response data: 
{ message: "Opps! Something went wrong."} | 
{ currentState: "waiting" | "your turn" | "closed",
playerIndex: 0 | 1 | 2,
player1Action: "rock" | "paper" | "scissor",
player2Action: "rock" | "paper" | "scissor",
roundNumber: 1 | 2 | 3,
player1: "player1Id",
player2: "player2Id",
historyRound: [] }


Description: create the game information for display.

- 🌐 POST
**/api/games/join**

request body: gameId
cookie: playerId

returns:
response code: 200 | 400
response data:  { message: "success" | "Opps! Something went wrong." | "Game ID is invalid!"}


Description: Join or rejoin an existing game using gameId. User is only able to join an opening game which is waiting for another play or the game the user is already in.

- 🌐 POST
**/api/games/play**

request body: gameId, action
cookie: playerId

returns:
response code: 200 | 400
response data: {message: "success" | "Opps! Something went wrong." | "You already played!" | "Game not exist!” }


Description: Player plays an action in the game round. Player is allowed to place an action when the game round is ready. If player is already played in that round, no further play action is allowed. 

# Testing

### Run unit test

```bash
npm run test
# or
yarn test
```

##
