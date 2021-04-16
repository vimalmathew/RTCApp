const express = require('express');
const app = express()
const PORT = 3000 || process.env.PORT
const path = require('path')
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)
const {messageFormat} = require('./utils/messageFormat')
const queryString = require('query-string');
const {userjoin, getCurrentUser} = require('./utils/users')
const user = 'chatbot'
//Set static folder
app.use(express.static(path.join(__dirname,'public')))

io.on('connection',(socket)=>{
    socket.on('join-room',(details)=>{
        const user = userjoin(socket.id, details.name, details.roomNo)  
        socket.join(user.room)
        //Welcome current user
        socket.emit('entry-message', messageFormat('user','welcome to chatbot'));
        //User Welcome info to others
        socket.broadcast.to(user.room).emit('broadcast-message', messageFormat(user.username, user.username+ ' has joined the chat'));
    })
    //Info when someone leaves chat
        socket.on('disconnect',()=>{
            
            io.emit('leave-message', messageFormat(user.username, user.username+ ' has left chat') )
        })

    //Receives Chat message
    socket.on('chat-message',(message)=>{
        io.emit('entry-message', messageFormat('user', message))
    })
})
server.listen(PORT,()=>{
    console.log('Running on port no '+PORT);
})