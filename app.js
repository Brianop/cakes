import express from 'express';
import mongoose from 'mongoose';

import {homeRouter, cakesRouter} from './routes/index.js';

mongoose.connect('mongodb://localhost/cakes', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true)

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', homeRouter);
app.use('/cakes', cakesRouter);

app.listen(port);
