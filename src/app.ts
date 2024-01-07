import express from 'express';
import main from './routers/main';

const app = express();
const port = 3000;
app.use('/', main);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
