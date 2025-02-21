require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "*",
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({ 
        is_success: false, 
        message: "Invalid input: 'data' should be an array" 
      });
    }

    const numbers = [];
    const alphabets = [];

    data.forEach(item => {
      if (!isNaN(item)) {
        numbers.push(item);
      } else {
        alphabets.push(item);
      }
    });

    let highest_alphabet = [];
    if (alphabets.length > 0) {
      let highest = alphabets[0];
      alphabets.forEach(letter => {
        if (letter.toLowerCase() > highest.toLowerCase()) {
          highest = letter;
        }
      });
      highest_alphabet.push(highest);
    }

    const response = {
      is_success: process.env.IS_SUCCESS === 'true',  // using env variable
      user_id: process.env.USER_ID,                   // "prashant_19112003"
      email: process.env.COLLEGE_EMAIL,                // "22BAI70756@cuchd.in"
      roll_number: process.env.ROLL_NUMBER,            // "22BAI70756"
      numbers,
      alphabets,
      highest_alphabet
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ is_success: false, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
