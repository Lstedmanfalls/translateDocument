import express from 'express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import main from './routers/main';
const app = express();
const port = 3000;
app.use('/', main);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
