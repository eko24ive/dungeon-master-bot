## Dungeon Master Bot
This project contains source files of telegram bot ([@DungeonMasterRiBot](https://t.me/@DungeonMasterRiBot)) which helps to parse loot and other information from dungeons from [@WastelandWars](https://t.me/@WastelandWarsBot)

### Prerequisites
MongoDB should be installed at your machine

### Setting up the project
1. Ensure you have the latest NodeJS and NPM installed
2. Clone this repo
3. Run `npm i` or `yarn`

### Running the project
1. Create `.env` file at the root level of the project
2. Populate it with following text:
```
BOT_TOKEN=<YOUR_BOT_TOKEN>
MONGODB_URI=<YOUR_MONGO_DB_ADDRESS>
MONGODB_RUNNER_URI=<MONGO_DB_ADDRESS_FOR_RUNNERS>
```
3. Visit [@botfater](https://t.me/botfather/) and generate yourself a bot token
4. Replace `<YOUR_BOT_TOKEN>` with just generated token
5. Replace `<YOUR_MONGO_DB_ADDRESS>` with your MongoDB address (probably its mongodb://localhost/dmb)
   `<MONGO_DB_ADDRESS_FOR_RUNNERS>` is used for runners in `/src/runners`

6. Seed the database using `npm run seed` command
7. Run the project using `npm start` command

### Debugging
It is possible to debug this solution using VSCode debug tools via `Dev` configuration.

### Contribution
Feel free to submit a PR, ensure that your code fullfils eslint rules.
Also, feel free to create an issue as well!