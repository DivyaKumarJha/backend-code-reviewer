const path = require('path');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

// Load .env file with explicit path
const result = dotenv.config({ path: path.join(__dirname, '.env') });

if (result.error) {
    console.error('Error loading .env file:', result.error);
    process.exit(1);
}
// const cors = require("cors");
// app.use(cors({
//   origin: "https://frontend-code-reviewer.vercel.app", // Allow only your Vercel frontend
//   credentials: true
// }));

// console.log('Environment loaded from:', path.join(__dirname, '.env'));
// console.log('GOOGLE_API_KEY exists:', !!process.env.GOOGLE_API_KEY);

const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// This is the entry point for the backend server.
