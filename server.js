const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db.js'); // This line ensures db.js runs and logs the connection

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.listen(5000, () => console.log('Server running on port 5000'));
