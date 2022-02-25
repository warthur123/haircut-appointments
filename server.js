const express = require('express');
const cors = require('cors');
const path = require('path');
const { Client } = require('pg');

const PORT = process.env.PORT || 8000;

const app = express();

// Middleware //
app.use(cors());
app.use(express.json());

// Connect DB //
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
    port: 5432, 
    ssl: {
      rejectUnauthorized: false
    }
  })


// Routes //
// GET get all appointments
app.get('/all', async (req, res) => {
    try {
      const allapts = await client.query('SELECT * FROM appointments ORDER BY apt_date, apt_time;');
      res.json(allapts.rows);
    } catch (error) {
      console.error(error);
    }
  })
  
  //PUT reserve appointment
  app.put('/reserve/:id', async (req, res) => {
    try {
      const id = req.body.id;
      const name = req.body.name;
      const email = req.body.email;
  
      await client.query('UPDATE appointments SET claimed = true, claimer_name = $2, claimer_email = $3 WHERE id = $1;', [id, name, email]);
      console.log(req.body)
      res.send('appointment successfully reserved.');
    } catch (error) {
      console.error(error);
    }
  })



app.use(express.static(path.join(__dirname, "client", "build")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


client.connect()
  .then(() => app.listen(PORT, () =>
    console.log(`app listening on port ${PORT}!`)))
  .catch((error) => console.log(error.message));