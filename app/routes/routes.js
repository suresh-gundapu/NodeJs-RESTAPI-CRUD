const express = require('express');
const connection = require('../config/database');
const router = express.Router();

router.get('/getMobiles',(req,res)=>{

    //query
    connection.query("SELECT * FROM mobiles",(error,results,fields)=>{

        if(error){
            throw error;
        }else{
            res.json({
                "status":1,
                "data":results
            });
        }

    })

});
//get data based on parm id 


router.get('/getMobiles/:id',(req,res)=>{
    var id = req.params.id;
    connection.query("SELECT * FROM mobiles WHERE id=?",[id],(error,results)=>{
        if(error){
            throw error;
        }else{
            res.json({
                "status":1,
                "data":results
            })
        }
    });
});

//insert query 

router.post("/insertMobiles",(req,res)=>{
    var name = req.body.name;
    var price = req.body.price;
    var ram = req.body.ram;
    var storage = req.body.storage; 

    connection.query("INSERT INTO  mobiles (name,price, ram, storage) VALUES (?,?,?,?)",[name,price,ram,storage],(error,result,fields)=>{
if(error){
    throw error;
}else{
    res.json({
        "status":1,
        "data":result,
        "message":"Data inserted successfully",
        "lastInsertID":result.insertId
    });
}

    });

});

//Delete data

router.delete("/deleteData",(req,res)=>{
    var user_id = req.body.userid;
    connection.query("DELETE from mobiles WHERE id = ?",[user_id],(error,result,fields)=>{
if(error){
    throw error;
}else{
    res.json({
        status:1,
        data:result,
        message:"Data deleted successfully",
    })
}
    })

});

//update data
router.put("/updateData",(req,res)=>{
    var name = req.body.name;
    var price = req.body.price;
    var ram = req.body.ram;
    var storage = req.body.storage; 
    var user_id = req.body.userid;

    connection.query("UPDATE mobiles SET name = ?, price = ? , ram = ?, storage = ? WHERE id = ?",[name,price,ram,storage,user_id],(error,result)=>{
        if(error){
            throw error;
        }else{
            res.json({
                status:1,
                data:result,
                message:"Data Updated successfully",
            })
        }

    })
});

//stored procedure 

router.get("/mobile-details/:id",(req,res)=>{
    var id = req.params.id
connection.query("CALL get_user_details(?)",[id],(error,result)=>{
    if(error){
        throw error;
    }else{
        res.json(result[0]);
    }
});
})
/*WHERE clause : IN, Between , >,<, AND .OR

SELECT * from mobiles WHERE price IN (1000,10000)

SELECT * from mobiles WHERE price BETWEEN 1000 AND 5000

SELECT * from mobiles WHERE price > 20000

SELECT * from mobiles WHERE price <  20000

SELECT * from mobiles WHERE price <  20000 AND id = 2

SELECT * from mobiles WHERE price <  20000 OR id = 2

*/

router.get("/getMobilesCond",(req,res)=>{

    connection.query("SELECT * from mobiles WHERE price BETWEEN 1000 and 10000",(error,result)=>{

        if(error){
            throw error;
        }else{

            res.json({
                "status":1,
                "data":result
            });

        }
    })
})

/**
 * Like Wild cards contains : _& %
 * 
 * SELECT * from mobiles WHERE name LIKE '%a%'
 */


/**Joins 
 * SELECT mb.name as mobile_name, mb.price as m_price FROM mobiles as mb INNER JOIN users as u
 * ON mb.user_id = u.id 
 * 
*/

router.get("/getMobilesJoins",(req,res)=>{

    connection.query("SELECT mb.name as mobile_name, mb.price as m_price FROM mobiles as mb RIGHT JOIN users as u ON mb.user_id = u.id  ",(error,result)=>{

        if(error){
            throw error;
        }else{

            res.json({
                "status":1,
                "data":result
            });

        }
    })
})

module.exports = router;