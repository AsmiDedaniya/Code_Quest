const express = require("express");
const cors = require('cors');
const router = require("./routes/search");

const app = express();

app.use(cors());              // Apply CORS middleware
app.use(express.json());      // Apply JSON parsing middleware

app.use('/api/v1', router);   // Define your routes

app.listen(4000, () => {
    console.log("app is running on port 4000");
});
