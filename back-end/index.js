const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userController = require('./controllers/usersController.js');

require('./db.js');

const app = express();
app.use(bodyParser.json());
app.use(cors());

require('./routes')(app);
app.use('/', userController);

// start the server
const port = process.env.port || 3000;
app.listen(port, () => console.log(`The Port Run On ${port}...`));