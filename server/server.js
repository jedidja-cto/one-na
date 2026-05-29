require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve static files from one-namibia folder
app.use(express.static(path.join(__dirname, '..', 'one-namibia')));

// Routes
const placesRouter = require('./routes/places');
app.use('/api/places', placesRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Catch all for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'one-namibia', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Foursquare search: http://localhost:${PORT}/api/places/foursquare/search?sector=Tourism&region=Erongo`);
});
