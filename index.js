import express from 'express';
import { loggerMiddleware } from './middlewares/logger.js';
import bookRouter from './routes/book.routes.js';
import authorRouter from './routes/author.routes.js'


const app = express();
const PORT = 8000;

// Middlewares (Plugins)
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use('/books', bookRouter);
app.use('/authors', authorRouter);

app.listen(PORT, () => console.log(`Http server is running on PORT ${PORT}`));
