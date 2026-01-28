import express from "express";
import db from "./data/db.js"

const PORT = 3030;
const app = express();

app.use(express.json());

app.get('/students', (req, res) => {
    const clss = req.query.class
    const students = db.prepare('SELECT * FROM students WHERE classes == ?').all(clss)
    res.status(200).json(students)
})

app.get('/subjects', (req, res) => {
    const sub = req.query.name
    const subjects = db.prepare('SELECT * FROM subjects WHERE name == ?').all(sub)
    res.status(200).json(subjects)
})

app.get('/studnets/:id', (req,res) => {
    const id = req.params.id
    const student = db.prepare('SELECT * FROM students WHERE id == ?').get(id)
    res.status(200).json(student)
})

app.post('/courses', (req, res) => {
    const {firsname, lastname, classes, subjects} = req.body;
    const course = db.prepare('INSERT INT subjects (firsname, lastname, classes, subjects) VALUES (?, ?, ?, ?)').run(firsname, lastname, classes, subjects)
    res.status(201).json({id: course.lastInsertedRow})
})

app.listen(PORT, () => {
    console.log(`Server runs on port: ${PORT}`)
})

app.get