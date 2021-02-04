let express = require('express');
let router = express.Router();
let con = require('../db');


//All product
router.get("/", (req,res) =>{
    con.query("SELECT * FROM product", function (error, results, fields) {
        let msg = "";

        if(results === undefined || results.length == 0){
            msg = "Product empty"
        }
        else{
            msg = "Product all"

        }
        return res.send({error:false, data: results ,message:msg});
        
      });
})

//Get Product id

router.get('/:id', (req,res) =>{
    let product_id = req.params.id;
    
    if (!product_id) {
        return res.status(400).send({error:true, message:"Press provide id product "})
    }else{
        con.query("SELECT * FROM product WHERE product_id  = ?",product_id, function (error, results, fields) {
            if (error)  throw error
            let msg = "";
            if(results === undefined || results.length == 0){
                msg = "Product not found"
            }
            else{
                msg = "Product id : ("+ product_id + ")" ;
            }
            return res.send({error:false, data: results[0] ,message:msg});
            
          });
    }
})

//Add Product
router.post("/", (req,res)=>{
    let product_name = req.body.name;
    let product_in_stock = req.body.stock;
    let category_id = req.body.id;

    if(!product_name||!product_in_stock||!category_id){
        return res.status(400).send({error:true, message:"Press provide name and stock and id."})
    }else{
        con.query('INSERT INTO product (product_name,product_in_stock,category_id) VALUES (?,?,?)',[product_name,product_in_stock,category_id],(error,results,fields)=>{
            if(error) throw error;
        return res.send({error:false, data: results ,message:"Product add success"});
        })
        

    }


})

//Update Product 
router.put('/',(req,res)=>{
    let product_id  = req.body.id;
    let product_name = req.body.name;
    let product_in_stock = req.body.stock;
    let category_id = req.body.category_id;

    if(!product_id ){
        return res.status(400).send({error:true, message:"Press provide id."})
    }else{ 
        if (!product_name && !product_in_stock && category_id) {
            return res.status(400).send({error:true, message:"Press provide name and stock and category id."})
        }else{
            let sql_update = [];
            if (product_name) {
                 sql_update_col = "product_name = \'"+ product_name +'\'';
                 sql_update.push(sql_update_col);
            }
            if(product_in_stock){
                 sql_update_col = "product_in_stock = \'"+ product_in_stock +'\'';
                 sql_update.push(sql_update_col);
            }
            if(category_id){
                sql_update_col = "category_id = \'"+ category_id +'\'';
                sql_update.push(sql_update_col);
           }
            var sql = 'UPDATE product SET '+ sql_update.toString() +' WHERE product_id = '+ product_id;

            con.query(sql,(error,results,fields)=>{                    
                if (error)  throw error
                    let msg = "";
                    if(results === undefined || results.length == 0){
                        msg = "Product not found or data are same"
                    }
                    else{
                        msg = "Product id : ("+ product_id + ") Update success" ;
                    }
                    return res.send({error:false ,message:msg});
                })
        }
    }
})

//Delete Product 
router.delete('/' , (req,res) =>{
    let product_id  = req.body.id ;

    if(!product_id ){
        return res.status(400).send({error:true, message:"Press provide product_id."})
    }else{
        con.query('DELETE FROM product WHERE product_id = ?',product_id,(error,results,fields)=>{                    
            if (error)  throw error
                let msg = "";
                if(results.affectedRows === 0){
                    msg = "Product not found "
                }
                else{
                    msg = "Product id : ("+ product_id + ") Deleted success" ;
                }
                return res.send({error:false ,data: results,message:msg});
            })
    }
    


})



//Get Product in category
router.get('/category/:id', (req,res) =>{
    let category_id = req.params.id;
    if (!category_id) {
        return res.status(400).send({error:true, message:"Press provide id category."})
    }else{
        con.query("SELECT * FROM product WHERE category_id = ?",category_id, function (error, results, fields) {
            if (error)  throw error
            let msg = "";
            if(results === undefined || results.length == 0){
                msg = "Product not found";
            }
            else{
                msg = "Product in Category id : ("+ category_id + ")." ;
            }
            return res.send({error:false, data: results ,message:msg});
          });
    }
})

module.exports = router;