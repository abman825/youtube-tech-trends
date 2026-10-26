const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// API Endpoint til at hente nyheder fra Hacker News
app.get('/api/tech-trends', async (req, res) => {
  try {
    const topStoriesResponse = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
    const storyIds = topStoriesResponse.data.slice(0, 10); // Hent de 10 nyeste emner

    const stories = await Promise.all(
      storyIds.map(async (id) => {
        const item = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return {
          id: item.data.id,
          title: item.data.title,
          url: item.data.url || `https://news.ycombinator.com/item?id=${id}`
        };
      })
    );

    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: 'Kunne ikke hente data' });
  }
});

// ለRender ዝግጁ የሆነ የፖርት ማስተካከያ
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend kører på http://localhost:${PORT}`);
});
