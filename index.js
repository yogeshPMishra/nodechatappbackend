const express = require('express')
const cors = require('cors')
const app = express();
const io = require('socket.io')(8000,{cors: {origin: "*"}},()=>{
    console.log('server run on port no 8000');
})
const  users = {};
io.on('connection',socket =>{
    socket.on('new-user-joined', name =>{
        console.log('new-user',name);
        if(name == undefined || name == null){
            return;
        }
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name)
    })
    
    socket.on('send', message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    })

    socket.on('disconnect',message =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id]
    })
})