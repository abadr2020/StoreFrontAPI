import express from 'express';
import { orderRepo } from './Repositories/order.repo';
import Router from './Routes';
import cors from 'cors';

const _orderRepo = new orderRepo();
// create app object from the express module
const app = express();
// use port 3500 to listen 
const port = 3500;
// declare an endpoint for the root path
app.get('/', (req: express.Request, res: express.Response): void => {
});
app.use(
  cors(),
  express.json(),
  express.urlencoded({
    extended: true
  }),
)

// Routes
app.use('/api', Router);

// listen to port 3500 
app.listen(port, async () => {
  await _orderRepo.getAll();
  console.log('Server is running on port 3500');
});

export default app;
