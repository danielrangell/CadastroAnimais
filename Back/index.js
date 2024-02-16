import express from "express";
import cors from "cors";
import {executeQuery} from "./Database.js";

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(cors());

let port = process.env.PORT || 3000;

app.get("/animais", (req, res) => {
    executeQuery("SELECT * FROM ANIMAL",[],(err, result) => {
        if(err){        
            return res.status(500).json(err);
        } else {
            return res.status(200).json(result);
        }
    });
});

app.get("/animais/:id", (req, res) => {
    executeQuery("SELECT * FROM ANIMAL WHERE ID=?",[req.params.id],(err, result) => {
        if(err){        
            return res.status(500).json(err);
        } else {
            return res.status(200).json(result);
        }
    });
});

app.delete("/animais/:id", (req, res) => {
    executeQuery("DELETE FROM ANIMAL WHERE ID=?",[req.params.id],(err, result) => {
        if(err){        
            return res.status(500).json(err);
        } else {
            return res.status(200).send("OK");
        }
    });
});

app.post("/animais", (req, res) => {
    console.log("banco de dados 1");
  let sql = "INSERT INTO ANIMAL(NOME,PROPRIETARIO,DTNASCIMENTO) VALUES(?,?,?)";
  if (!req.body.id){
    executeQuery(sql,[req.body.nome, req.body.proprietario, req.body.dtnascimento], function(err, result){
        if(err){
            console.log(err);
            return res.status(500).json(err); 
        } else {

            return res.status(201).send("ok")//json(result);  
        }
    });  
 } else {
    sql = "UPDATE ANIMAL SET NOME = ?, PROPRIETARIO = ?, DTNASCIMENTO = ? WHERE ID = ?";
    executeQuery(sql,[req.body.nome, req.body.proprietario, req.body.dtnascimento,req.body.id], function(err, result){
        if(err){
            console.log(err);
            return res.status(500).json(err); 
        } else {

            return res.status(201).send("ok")//json(result);  
        }
    });    
 } 
});

app.listen(port, () => {
    console.log(`Servidor iniciado na porta: ${port}`);
});
