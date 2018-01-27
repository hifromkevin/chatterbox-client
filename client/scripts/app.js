
  
let app = {
    server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',

    init: () => {
      console.log('ay');
      $(document).ready(function() {
        console.log('ay2');
        app.fetch(app.server);   
      });
    },
    send: (message) => {
      $.ajax({
 
        // This is the url you should use to communicate with the parse API server.
        url: app.server,
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

    fetch: () => {
      $.ajax({
        url: app.server,
        type: 'GET',
        //data: 'h', //=- orderOf ? ?? 
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Query sent');
          console.log(data);
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send query');
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
      console.log('Message: ', message);
      console.log('Room: ', message['roomname']);
      console.log('Text: ', message['text']);
      console.log('Username: ', message['username']);

      let roomDiv = document.createElement('div');
      let textDiv = document.createElement('p');
      let usernameDiv = document.createElement('p');

      let roomBody = message['roomname'];
      let textBody = message['text'];
      let usernameBody = message['username'];


      roomDiv.setAttribute('class', 'roomBody'); 
      textDiv.setAttribute('class', 'textBody');
      usernameDiv.setAttribute('class', 'usernameBody'); 
      // roomDiv.append(usernameDiv).append(textBody);
      //textDiv.textContent = textBody;
      let element = document.getElementById('chats'); //****
      element.appendChild(textDiv);//******
      $('#send').on('click', function() {
        $('#chats').append($('#message').val() + '<br />'); //$('#message').val()
      });
    },

    renderRoom: (message) => {
      
      let div = document.createElement('div');
      let textBody = message['roomname'];
      div.textContent = textBody;
      div.setAttribute('class', 'textRoom'); 

      let element = document.getElementById('roomSelect');
      element.appendChild(div);
    },

    handleUsernameClick: () => {
      let username = document.getElementsByClassName('usernameBody');
      username.onclick = function() {
        console.log('clicked'); 
      };
    }
  };
app.init();


