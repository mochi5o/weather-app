import express from 'express';
import dotenv from 'dotenv';
import router from './router';

dotenv.config();
const app = express();

app.set('port', process.env.PORT ?? 3000);
app.set('env', process.env.NODE_ENV ?? 'development');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);

export default app;
