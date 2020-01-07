const messageBoard = {
    messages: [],
    init: () => {
        messageBoard.newMessage("admin", "A mildy uncomfortable ice age is coming.")
        setTimeout(() => {
            messageBoard.newMessage("admin", "Travel south to avoid it.")
            setTimeout(() => {
                messageBoard.newMessage("admin", "WASD to move.")
            }, 3000);
        }, 3000);
    },
    newMessage: (author, content) => {
        if (messageBoard.messages.length >= 100) {
            messageBoard.messages.shift()
        }
        messageBoard.messages.push({
            author,
            content
        })
        messageBoard.drawMessages()
    },
    drawMessages: () => {
        let messageHTML = ''
        messageBoard.messages.map(message => {
            messageHTML += `<div class="message ${message.author}">- ${message.content}</div>`
        })
        $("#message-history").html(messageHTML)
        const scroll = document.getElementById("message-history")
        scroll.scrollTop = scroll.scrollHeight
    }
}