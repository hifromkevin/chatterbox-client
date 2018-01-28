

let app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  
  init: () => {
    console.log('page loaded');
    app.fetch(app.server);
  },

  send: (message) => {
    let newMessage = document.getElementById('message');
    let newRoom = document.getElementById('newroom');
    let selectedRoom = document.getElementById('rooms');
    console.log('sel room: ', selectedRoom);
    if (newRoom.value !== '') {
      console.log('you entered text');
      message['roomname'] = newRoom.value;
    } else {
      console.log('you selected a room');
      message['roomname'] = selectedRoom.value;
    }
    message['text'] = newMessage.value;
    console.log('here is the msg: ', message);

    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
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
      data: 'order=-createdAt',
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Query sent');
        console.log(data);
        app.renderMessage(data.results);
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

  renderMessage: (data) => {
    var obj = {};
    let element = document.getElementById('chats');
    for (var i = 0; i < data.length; i++) {
      obj[data[i]['roomname']] = data[i]['roomname'];
      // $('#send').on('click', function() {
      //   $('#chats').append($('#message').val() + '<br />'); //$('#message').val()
      // });
    }
    app.renderRoom(obj);

    $('#rooms').change(() => {
      var selected = $('#rooms option:selected').text();
      app.clearMessages();
      if ($('.usernameBody').data('roomname', selected)) {
        for (var i = 0; i < data.length; i++) {
          let target = selected;
          if (target === data[i]['roomname']) {
            /* Load correct messages */
            let textDiv = document.createElement('p');
            let usernameDiv = document.createElement('h3');
            let textBody = document.createTextNode(data[i]['text']);
            let usernameBody = document.createTextNode(data[i]['username']);

            usernameDiv.appendChild(usernameBody);
            element.appendChild(usernameDiv);
            textDiv.appendChild(textBody);
            element.appendChild(textDiv);
            textDiv.setAttribute('class', 'textBody');
            textDiv.setAttribute('data-roomname', data[i]['roomname']);
            usernameDiv.setAttribute('class', 'usernameBody'); 
            usernameDiv.setAttribute('data-roomname', data[i]['roomname']);

            /* Handle new messages */
    /*$('#send').on('click', () => {
      $('#chats').append('<p class="text usernameBody" style="padding: 2%; background-color: #ccc;">' + $('#message').val() + '</p>');
      $('#message').val('');
    });

    $('.usernameBody').on('click', () => {
      console.log('hi!');
    });*/
            let sendButton = document.getElementById('send');
            let newMessage = document.getElementById('message');
            let msgToSend = {
              username: window.location.search.split('=')[1],
              //roomname: 'poois'
            };
            
            //newMessage.value();
            sendButton.onclick = function () {
              app.send(msgToSend);
            };
          }
        }
      }
    });
  },

  renderRoom: (roomObj) => {
    let element = document.getElementById('rooms');
    for (var key in roomObj) {
      let roomDiv = document.createElement('option');
      let roomBody = document.createTextNode(roomObj[key]);
      roomDiv.appendChild(roomBody);
      roomDiv.setAttribute('value', roomObj[key]);
      document.getElementById('rooms').append(roomDiv);
      element.appendChild(roomDiv);
    }
  },

  handleUsernameClick: () => {
    let username = document.getElementsByClassName('usernameBody');
    username.onclick = function() {
      console.log('clicked'); 
    };
  }
};

$(document).ready(function() {
  app.init(); 
});



