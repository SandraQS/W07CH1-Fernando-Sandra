require("dotenv").config();
const initDB = require("./database/index");
const initializerServer = require("./server/index");

const port = process.env.PORT ?? process.env.SERVER_PORT ?? 3005;

initDB(process.env.MONGODB_STRING_SERIES);
initializerServer(port);
