const products = require('./api/routes/products');
const orders = require('./api/routes/orders');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

app.use(morgan('dev'));
app.use(express.json());

mongoose.connect(`mongodb+srv://rest-shopkeeper:${process.env.MONGO_ATLAS_PASWD}@rest-shop-lwh6s.mongodb.net/shop?retryWrites=true&w=majority`, {useNewUrlParser : true})
   .then(()=> console.log('connected to mongodb'))
   .catch(err => {
      console.log(err);
   });

// Enable CORS
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header(
      'Access-Control-Allow-Headers', 
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
   );
   if(req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
      return res.status(200).json({});
   }
   next();
})


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

