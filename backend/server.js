const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/api/auth');
const isAuthenticated = require('./src/middlewares/isAuthenticated');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' })); // Adjust the origin as per your frontend URL
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api/protected', isAuthenticated, (req, res) => {
  res.json({ message: 'You have access to this protected route.' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
