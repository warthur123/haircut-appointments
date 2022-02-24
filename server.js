const express = require('express');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 8000;

const app = express();

// Middleware //
app.use(cors());
app.use(express.json());


// Routes //
// GET get all appointments
app.get('/all', async (req, res) => {
    try {
        res.send("Hello World");
    } catch (error) {
        console.error(error);
    }
})


app.use(express.static(path.join(__dirname, "/client")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});


app.listen(PORT, () =>
    console.log(`app listening on port ${PORT}!`))