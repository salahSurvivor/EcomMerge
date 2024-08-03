const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('./db.js');

const app = express();
app.use(bodyParser.json());
app.use(cors());

require('./routes')(app);

// start the server
const port = process.env.port || 3000;
app.listen(port, () => console.log(`The Port Run On ${port}...`));