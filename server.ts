import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Health check endpoint for Tenten hosting & Cloud monitoring
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      app: 'Thế Giới Của Bé Nhật Minh',
      nodeVersion: process.version,
      uptime: process.uptime(),
    });
  });

  // TTS Proxy / Audio cache endpoint for offline/cross-origin safety if needed
  app.get('/api/tts', async (req, res) => {
    const text = req.query.text as string;
    if (!text) {
      res.status(400).send('Missing text query');
      return;
    }
    try {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(text)}`;
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        },
      });
      if (!response.ok) {
        res.status(502).send('TTS upstream error');
        return;
      }
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      const arrayBuffer = await response.arrayBuffer();
      res.send(Buffer.from(arrayBuffer));
    } catch {
      res.status(500).send('Failed to generate speech');
    }
  });

  // Vite development middleware vs Production static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Nhật Minh Web Game Server running on port ${PORT} (Node ${process.version})`);
  });
}

startServer();
