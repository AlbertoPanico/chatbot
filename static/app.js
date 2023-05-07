class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('chat-box-header'),
            chatBox: document.querySelector('chat-box-body'),
            sendButton: document.querySelector('chat-input')
        }

        this.state = false;
        this.messages = [];

    }

    display() {
        const{openButton, chatBox, sendButton} = this.args;

        // Event Listener
        openButton.addEventListener('click', ()=> this.toggleState(chatBox))
        sendButton.addEventListener('click', ()=> this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key == "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = this.state

        // show the chatbox or not
        if(this.state == true) {
            chatbox.classList.add('chat-box')
        } else {
            chatbox.classList.remove('chat-box')
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = {name: "Tu", message: text1}
        this.messages.push(msg1);

        fetch($SCRIPT_ROOT + '/predict', {
            method: 'POST',
            body: JSON.stringify({message:text1}),
            mode: 'cors',
            headers: {
                'Content-Type' : 'application/json'
            },
        })
        .then(r => r.json())
        .then(r => {
            let msg2 = {name: 'John', message: r.answer};
            this.messages.push(msg2);
            this.updateChatText(chatbox)
            textField.value = ''
        }).catch((error) => {
            console.error('Error: ', error);
            this.updateChatText(chatbox)
            textField.value = ''
        });
    }

    updateChatText(chatBox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, ){
            if (item.name == "John") {
                html = html + '<div class="messages_item messages__item--visitor"' + item.message + '</div>'
            } else {
                html = html + '<div class="messages_item messages__item--operator"' + item.messages + '</div>'
            }
        });

        const chatmessage = chatBox.querySelector('chatbox__messages');
        chatmessage.innerHTML = html
    }
}

const chatbox = new Chatbox();
chatbox.display