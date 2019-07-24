const products = require('./api/routes/products');
const orders = require('./api/routes/orders');
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res)=>{
   //res.send('Welcome to the Shop');
   res.json('Welcome to the Shop');
});

app.use('/products', products);
app.use('/orders', orders);

// Handling Unsupported Routes Error

app.use((req, res, next)=>{
   const error = new Error('Not found');
   error.status = 404;
   next(error);
});

app.use((err, req, res, next)=>{
   res.status(err.status || 500).json({
      error : {
         message : err.message
      }
   });
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.info(`app is listening on the port:${port}`));

