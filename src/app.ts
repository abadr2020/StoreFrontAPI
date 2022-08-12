import express from 'express';
import Router from './Routes';

// create app object from the express module
const app = express();
// use port 3500 to listen 
const port = 3500;
// declare an endpoint for the root path
app.get('/', (req: express.Request, res:express.Response): void  => {
    // redirect to the /api/images path
    res.send('/api/images');
});
app.use(
    express.json(), 
    express.urlencoded({
      extended: true
    }),
  )

// Routes
app.use('/api', Router);

// listen to port 3500 
app.listen(port, async () => {
    console.log('Server is running on port 3500');
});

export default app;
