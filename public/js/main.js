const socket = io();
const chatForm = document.querySelector('#chat-form');

socket.on('message', message => {
    console.log(message)
});

// Message submit
chatForm.addEventListener('submit', e => {
    e.preventDefault();

    // Get message text
    const msg = e.target.elements.msg.value;

    // Emit message to server
    socket.emit('chatMessage',msg)
});
