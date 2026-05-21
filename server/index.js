const express = require('express');
const app = express();
const {Server} = require('socket.io');
const {createServer} = require('http')
const port = 3000;
const cors = require('cors')


app.use(cors())
const server = createServer(app);
const io = new Server(server,{
    cors : {
        origin : "http://localhost:5173"
    }
})

app.get('/',(req,res)=>{
    res.send("serever started")
})

io.on('connection',(socket)=>{
    console.log("User connected",socket.id);
    socket.emit('message',"welcome to the server")
    
    
})

io.emit('massege',"hello everyone")
server.listen(port,()=>{

    console.log(`serever started on port http://localhost:${port}`)
})