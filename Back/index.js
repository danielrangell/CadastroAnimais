import express from "express";
import cors from "cors";
import { executeQuery } from "./Database.js";
import bodyParser from 'body-parser';


const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);


app.use(express.json({ limit: '50mb' }));
app.use(cors());

let port = process.env.PORT || 3000;

app.get("/animais", (req, res) => {
    executeQuery("SELECT * FROM ANIMAL", [], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        } else {
            return res.status(200).json(result);
        }
    });
});

app.get("/animais/:id", (req, res) => {
    executeQuery("SELECT * FROM ANIMAL WHERE ID=?", [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        } else {
            return res.status(200).json(result);
        }
    });
});

app.delete("/animais/:id", (req, res) => {
    executeQuery("DELETE FROM ANIMAL WHERE ID=?", [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        } else {
            return res.status(200).send("OK");
        }
    });
});

app.post("/animais", (req, res) => {
    let sql = "INSERT INTO ANIMAL (NOME, PROPRIETARIO, DTNASCIMENTO) VALUES(?,?,?)";
    let anim = req.body;
    if (!anim.id) {
        executeQuery(sql, [anim.nome, anim.proprietario, anim.dtnascimento], function (err, result) {
            if (err) {
                console.log(err);
                return res.status(500).json(err);

            }
        });
    }


});

app.listen(port, () => {
    console.log(`Servidor iniciado na porta: ${port}`);
});
