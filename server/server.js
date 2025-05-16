const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
// Validate env vars
if (!MONGO_URI) {
  console.error('❌ MONGO_URI not set in .env');
  process.exit(1);
}

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // during local dev
  // origin: '*'  // OR allow all origins (less secure, only for testing)
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes')); // ✅ Added this
app.use("/api/projects/:projectId/tasks", taskRoutes);

// Root Route
app.get('/', (req, res) => res.send('🚀 TaskFlow API Running'));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// MongoDB Connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () =>
      console.log(`✅ Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
