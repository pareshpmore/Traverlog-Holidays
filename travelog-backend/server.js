require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors()); // allows your React app (localhost:5173) to call this

app.get('/api/world-trips', async (req, res) => {
  const { cityCode } = req.query; // e.g. NEW_YORK, PARIS, LONDON

  if (!cityCode) {
    return res.status(400).json({ error: 'cityCode query param is required' });
  }

  try {
    const response = await fetch(
      `${process.env.HEADOUT_BASE_URL}/collections?cityCode=${cityCode}`,
      {
        headers: {
          [process.env.HEADOUT_AUTH_HEADER]: process.env.HEADOUT_API_KEY,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Headout API error:', response.status, errText);
      return res.status(response.status).json({ error: 'Headout API error' });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch from Headout', details: err.message });
}
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));