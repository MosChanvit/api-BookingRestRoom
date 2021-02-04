let express = require('express');
let router = express.Router();

let con = require('../db');



//All category
router.get("/", (req,res) =>{
    con.query("SELECT * FROM category", function (error, results, fields) {
        let msg = "";

        if(results === undefined || results.length == 0){
            msg = "Category empty"
        }
        else{
            msg = "Category all"
        }
        return res.send({error:false, data: results ,message:msg});
      });
})

//Get category id

router.get('/:id', (req,res) =>{
    let category_id = req.params.id;
    
    if (!category_id) {
        return res.status(400).send({error:true, message:"Press provide id product "})
    }else{
        con.query("SELECT * FROM category WHERE category_id = ?",category_id, function (error, results, fields) {
            if (error)  throw error
            let msg = "";
    
            if(results === undefined || results.length == 0){
                msg = "Category not found"
            }
            else{
                msg = "Category id : ("+ category_id + ")" ;
            }
            return res.send({error:false, data: results[0] ,message:msg});
            
          });
    }
})

//Add Category
router.post("/", (req,res)=>{
    let category_name = req.body.name;
    let category_detail = req.body.detail;

    if(!category_name||!category_detail){
        return res.status(400).send({error:true, message:"Press provide category name and category detail."})
    }else{
        con.query('INSERT INTO category (category_name,category_detail) VALUES (?,?)',[category_name,category_detail],(error,results,fields)=>{
        if(error) throw error;
        return res.send({error:false, data: results ,message:"Category add success"});
        })
    
    }
})

//Update Category 
router.put('/',(req,res)=>{
    let category_id  = req.body.id ;
    let category_name = req.body.name;
    let category_detail = req.body.detail;

    if(!category_id ){
        return res.status(400).send({error:true, message:"Press provide id."})
    }else{ 
        if (!category_name && !category_detail) {
            return res.status(400).send({error:true, message:"Press provide name and detail."})
        }else{
            let sql_update = [];

            if (category_name) {
                 sql_update_col = "category_name = \'"+ category_name +'\'';
                 sql_update.push(sql_update_col)
            }
            if(category_detail){
                 sql_update_col = "category_detail = \'"+ category_detail +'\'';
                 sql_update.push(sql_update_col)
            }
            var sql = 'UPDATE category SET '+ sql_update.toString() +' WHERE category_id = '+ category_id;

            con.query(sql,(error,results,fields)=>{                    
                if (error)  throw error
                    let msg = "";
                    if(results === undefined || results.length == 0){
                        msg = "Category not found or data are same"
                    }
                    else{
                        msg = "Category id : ("+ category_id + ") Update success" ;
            
                    }
                    return res.send({error:false ,message:msg});
                })


        }
        

    }

})

// Delete Category 
router.delete('/' , (req,res) =>{
    let category_id  = req.body.id ;

    if(!category_id ){
        return res.status(400).send({error:true, message:"Press provide category id."})
    }else{
        con.query('DELETE FROM category WHERE category_id = ?',category_id,(error,results,fields)=>{                    
            if (error)  throw error
                let msg = "";
                if(results.affectedRows === 0){
                    msg = "Category not found "
                }
                else{
                    msg = "Category id : ("+ category_id + ") Deleted success" ;
                }
                return res.send({error:false ,data: results,message:msg});
            })
    }

})


module.exports = router;