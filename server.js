const express = require('express');
const app = express()
const PORT = 3000 || process.env.PORT
const path = require('path')
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)

//Set static folder

app.use(express.static(path.join(__dirname,'public')))

io.on('connection',(socket)=>{
    //Welcome current user
    socket.emit('entry-message','welcome to chat-bot');
    //User Welcome info to others
    socket.broadcast.emit('broadcast-message','A new user has joined the chat');
    //Info when someone leaves chat
    socket.on('disconnect',()=>{
        io.emit('leave-message','A user has left chat')
    })
    //Receives Chat message
    socket.on('chat-message',(message)=>{
        io.emit('entry-message',message)
    })
})
server.listen(PORT,()=>{
    console.log('Running on port no '+PORT);
})