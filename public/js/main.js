const chatform  = document.getElementById("chat-form")
const msg = document.getElementById('msg')

//get username and room name
var socket = io();
const {username, room} = Qs.parse(location.search,{
    ignoreQueryPrefix:true
});

const details={
    name:username,
    roomNo:room
}
socket.emit('join-room',details)
document.getElementById("room-name").innerHTML=details.roomNo;
socket.on('entry-message',(message)=>{
    //console.log(message.user)
    outPutMessage(message)
})

socket.on('broadcast-message',(message)=>{
    //console.log(message)
    outPutMessage(message)
})

socket.on('leave-message',(message)=>{
    //console.log(message+ "in leave-message socket" )
    outPutMessage(message)
})

// on submitting the text

chatform.addEventListener('submit',(event)=>{
    event.preventDefault()
    if(event.target.elements.msg.value){
        socket.emit('chat-message',event.target.elements.msg.value);
        event.target.elements.msg.value='';
        document.getElementById("msg").focus();
    }
})
// craeting new message box
function outPutMessage(message){
   // console.log("main.js files")
    const newDiv = document.createElement('div');
    newDiv.classList.add('message')
    newDiv.innerHTML = '<p class="meta">'+ message.user + ' '+'<span>'+ message.time +'</span></p>' +
    '<p class="text">'+ message.message +'</p>'
    document.querySelector('.chat-messages').appendChild(newDiv)
    document.querySelector('.chat-messages').scrollTop = document.querySelector('.chat-messages').scrollHeight
}

// scroll to the bottom of div 



