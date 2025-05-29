const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');


const app = express();
const allowedOrigins = [
  'http://localhost:5173',
  'https://frontend-code-reviewer.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
}));

app.use(express.json()); // Middleware to parse JSON bodies
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/ai', aiRoutes);


module.exports = app;