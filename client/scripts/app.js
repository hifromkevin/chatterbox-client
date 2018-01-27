let app = { 
  init: () => {

  },
  
  send: (message) => {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      // log: console.log(message), 
      data: message, //JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  fetch: (query, url) => {
    $.ajax({
      url: url,
      type: 'GET',
      data: query,
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Query sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send query', data);
      }
    });
  },
  
  clearMessages: () => {
    let element = document.getElementById('chats');
    while (element.childNodes.length > 0) {
      for (let i = 0; i < element.childNodes.length; i++) {
        element.removeChild(element.childNodes[i]);
      }   
    }
  },

  renderMessage: (message) => {
    console.log('Room: ', message['roomname']);
    console.log('Text: ', message['text']);
    console.log('Username: ', message['username']);

    let div = document.createElement('div');
    let textBody = message['text'];
    div.textContent = textBody;
    div.setAttribute('class', 'textMsg'); 
    console.log(div);
    let element = document.getElementById('chats');
    element.appendChild(div);
  },

  renderRoom: (message) => {
    
    let div = document.createElement('div');
    let textBody = message['roomname'];
    div.textContent = textBody;
    div.setAttribute('class', 'textRoom'); 
    console.log(div);
    let element = document.getElementById('chats');
    element.appendChild(div);
  }
};


