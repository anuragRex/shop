const Product = require('../models/product');

exports.products_get_all = (req, res, next)=>{
    Product.find()
        .select('-__v')
        .then(docs => {
            const response = {
                count : docs.length,
                products : docs
            }
            res.json(response);
        })
        .catch(err => {
            res.status(500).json({
                message : "something went wrong",
                error : `${err.name} : ${err.message}`
            });
        });
};

exports.products_get_one = (req, res, next)=>{
    const id = req.params.id;
    Product.findById(id)
       .then(doc => {
            if(doc){
                return res.json({
                    message : "Product found",
                    product : doc
                });
            }
            res.status(404).json({
                message : "Product Not Found",
            });
        })
       .catch(err => {
          res.status(500).json({
             message : "something went wrong",
             error : `${err.name} : ${err.message}`
          });
        })
};

exports.products_delete_product = (req, res, next)=>{
    Product.deleteOne({ _id : req.params.id})
        .then(result => {
            if(result.deletedCount === 1){
                res.json({
                    result : "product deleted"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message : "something went wrong",
                error : `${err.name} : ${err.message}`
            });
        });
};