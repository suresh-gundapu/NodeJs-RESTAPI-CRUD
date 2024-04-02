const mysql = require('mysql2');
const env = require("./env.js");
const mysqlConnection = mysql.createConnection(
    {
        host:env.host,
        user:env.username,
        password:env.password,
        database:env.database 
    }
);
mysqlConnection.connect((err)=>{
    if(err){
        console.log('failed to connect DB');
    }else{
        console.log('Success to connect DB');
    }
});
