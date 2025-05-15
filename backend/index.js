const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes'); // ⬅️ Add this

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Route usage
app.use('/courses', courseRoutes);
app.use('/users', userRoutes); // ⬅️ Mount the user route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
