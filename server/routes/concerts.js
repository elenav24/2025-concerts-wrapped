import express from 'express';
import path from 'path';
import concertData from '../data/concerts.js';
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json(concertData);
});

router.get('/:concertId', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../public/concert.html'))
});

export default router;