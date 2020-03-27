const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3002;
require('dotenv').config()

const server = http.createServer(app);
server.listen(port, () => console.log("Application running on port " + port));
