const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());

//create user

app.post("/register", async(req, res) => {
    try {
        const {user_name, email, password} = req.body;
        //const hash = await bcrypt.hashSync(password, 10);
        const registerUser = await pool.query("INSERT INTO test_users (user_name, email, password) VALUES($1, $2, $3) RETURNING *",
        [user_name, email, password]);
        window.location("./client/src/user/login");
    } catch (err) {
        console.log(err.message);
    }
})

//login

app.post("/login", async(req, res) => {
    try {
        const {user_name, password} = req.body;
        const user = await pool.query("SELECT * FROM test_users WHERE user_name = $1", [
            user_name
        ]);
        
        if(!(user.rows[0] == null)){
            const validPass = await bcrypt.compareSync(password, user.rows[0].password);
            if(validPass){
                res.json("Logged in!");
            }else{
                res.json("Wrong password!");
            }
        }else{
            res.status(404).json("User not found!");
        }
    } catch (err) {
        console.log(err.message);
    }
})

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});