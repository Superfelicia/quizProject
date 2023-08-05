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

app.get('/getOptions', (req, res) => {
    connection.connect((err) => {
        if (err) throw err;
        const sql = 'SELECT * FROM questions';

        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });
});

app.post('/postQuizAnswers', (req, res) => {
    const {result} = req.body;
    console.log(result)

    const sql = 'INSERT INTO answers (answer, questionId) VALUES ?';
    const values = [];

    for (const questionId in result) {
        if (result.hasOwnProperty(questionId)) {
            const answerData = result[questionId];
            const {questionId: questId, answer} = answerData;
            values.push([answer, questId]);
        }
    }
    connection.query(sql, [values], (err, result) => {
        if (err) throw err;
        res.send();
    })
})

//getQuizAnswers funktion
app.get('/getQuizAnswers', (req, res) => {
    const sql = `SELECT a.questionId, a.answer FROM answers a LEFT JOIN answers b ON a.questionId = b.questionId AND a.id < b.id WHERE b.id IS NULL
    `
    connection.query(sql, (err, result) => {
        if (err) throw err;

        const quizAnswers = result.map((row) => {
            const {questionId, answer} = row
            return {questionId, answer}
        })
        res.send(quizAnswers);
    })
})

app.listen(3001, () => {
    console.log(`server running on port ${port}`);
});