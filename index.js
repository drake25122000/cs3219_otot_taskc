import express from 'express';
import cors from 'cors';
import { getRoutes } from './routes/index.js';

export const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

app.get("/", (req, res) => res.send("Hello World from Drake!!"));

app.use("/api", getRoutes()).all((_, res) => {
    res.setHeader("content-type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
});

app.listen(PORT, () => console.log('CS3219_OTOT_TASKC listening on port 8000'));

export default app;
