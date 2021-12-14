const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//create all todo

app.get("/data", async (req, res) => {
    const data = await pool.query("SELECT * FROM users");
    res.send(data);
})

app.post("/login", async (req, res) => {
    console.log("request came in");
    try{
        const email = req.body.email;
        console.log("email:" + email);
        const emailId = await pool.query("SELECT * FROM users WHERE user_email = $1", [email])
        if (emailId.rows.length === 0) {
            console.log(emailId);
            const insertEmail = await pool.query("INSERT INTO users(user_email) VALUES ($1) RETURNING *", [email]);
            console.log(insertEmail);
            res.end("email created");
        }
        else{
            console.log("email already exists")
            const todos = await pool.query("SELECT * FROM todo WHERE user_id = $1",  [emailId.rows[0].email_id]);
            res.end(todos.rows.toString);
        }
    }
    catch (e) {
        console.error(e.message);
        res.end("Something went wrong")
    }
});

app.post("/createTodo", async(req, res) => {
    //await
    try {
        
        const {user_id, todo_text} = req.body;
        const userId = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id])
        if(userId.rows.length === 0){
            res.end("Something went wrong")
        }
        else{
            const newTodo = await pool.query("INSERT INTO todo (user_id, todo_text) VALUES($1, $2) RETURNING *", 
            [user_id, todo_text]);
    
            res.json(newTodo.rows[0]);
        }
        
    } catch (err) {
        console.error(err.message);
    }
})

//get all todo

app.get("/getAllTodoes", async(req, res) => {
    try {
        const {user_id} = req.body;
        const userId = await pool.query("SELECT * FROM todo WHERE user_id = $1", [user_id])
        if(userId.rows.length === 0){
            res.end("404")
        }
        else{
            const allTodoes = await pool.query("SELECT * FROM todo where user_id = $1", [user_id]);
            res.json(allTodoes.rows);
        }

    } catch (err) {
        console.error(err.message);
    }
})

//get a todo

app.get("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", 
        [description, id]);

        res.json("Todo was updated!");
    } catch (err) {
        console.error(err.message);
    }
})

//delete a todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", 
        [id]);

        res.json("Todo was deleted!")
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});