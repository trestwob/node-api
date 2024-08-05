const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const connectToDb = require('./config/mongo');
const authRoutes = require('./routes/auth');

app.use(express.json());


//all post
connectToDb();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'src')));
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
