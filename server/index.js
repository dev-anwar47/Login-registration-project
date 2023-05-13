const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, (err) => {
        if (err) throw err;
        console.log('mongodb connection establish');
    }
);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server in running on port ${PORT}`)
});


app.use("/users", require("./Routes/user-router"));