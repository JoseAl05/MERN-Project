const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => console.log('DB Connected'))
    .catch(error => console.log('Error ' + error));