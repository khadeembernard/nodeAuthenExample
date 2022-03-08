const express =require('express')
const app = express()
const bcrypt = require("bcrypt")

app.use(express.json())

const users = [
    {
        username: 'Bernard',
        title: 'Instructor'
    },{
        username: 'Andi',
        title: 'Tool'
    },{
        username: 'Patty',
        title: 'Burger'
    }
]
// List of users for the purpose of user information that should
// Stored and accessed from the database like MongoDB

app.get('/users', (req,res)=>{
    res.json(users)
    //Return all users from database
})

app.post('/users', async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10)
        console.log('salt: ' + salt)
        //The salt is a random alphanumeric string 
        //The salt is used with the userpassward to ensure greater security
        //as the salt is created each time a new user is made.
        const hashedPassword  = await bcrypt.hash(req.body.password, salt)
        console.log('hashedPassword: ' + hashedPassword)
        //hashedPassword is a combination of the salt + user.password
        const user = {name:req.body.name, password:hashedPassword}
        users.push(user)
        //This push should be your post to the database
        res.status(201).send()
    }
    catch{
        res.status(500).send()
    }
})

app.post('/users/login', async(req,res)=>{
    const user = user.find(user => user.name = req.body.name)
    if(!user){
        return rest.status(400).send()
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send('Success')
        } else {
            res.send('Not Allowed')
        }
    }
    catch(e){
        rest.status(500).send()
    }
})

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})