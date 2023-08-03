import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: '127.0.0.1',
    database: 'quiz_ts',
    user: 'root',
    password: '',
});

const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());


app.get('/getQuestions', (req, res) => {
    connection.connect((err) => {
        if (err) throw err;
        const sql = 'SELECT * FROM questions';

        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    })
})

app.listen(3001, () => {
    console.log(`server running on port ${port}`);
});