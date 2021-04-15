const chatform  = document.getElementById("chat-form")
const msg = document.getElementById('msg')



var socket = io();

socket.on('entry-message',(message)=>{
    console.log(message)
    outPutMessage(message)
    

})
socket.on('broadcast-message',(message)=>{
    console.log(message)
    outPutMessage(message)
})
socket.on('leave-message',(message)=>{
    console.log(message)
    outPutMessage(message)
})

// on submitting the text

chatform.addEventListener('submit',(event)=>{
    event.preventDefault()
    if(event.target.elements.msg.value){
        socket.emit('chat-message',event.target.elements.msg.value);
        event.target.elements.msg.value='';
    }
})

// craeting new message box
function outPutMessage(message){
    console.log("main.js files")
    const newDiv = document.createElement('div');
    newDiv.classList.add('message')
    newDiv.innerHTML = '<p class="meta">Brad <span>9:12pm</span></p>' +
    '<p class="text">'+ message +'</p>'
    document.querySelector('.chat-messages').appendChild(newDiv)
    document.querySelector('.chat-messages').scrollTop = document.querySelector('.chat-messages').scrollHeight
    
}

// scroll to the bottom of div 



