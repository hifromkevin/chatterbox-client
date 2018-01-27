

let app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  
  init: () => {
    console.log('page loaded');
    app.fetch(app.server);
    // $('select').on('click', () => {
    //   console.log($(this).val());
    // });
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
/*        for (var i = 0; i < data.results.length; i++) {
          //obj[message['roomname']] = message['roomname'];
          app.renderMessage(data.results[i]);
        }*/
        //console.log('data', data.results.length);
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
/*    console.log('Room: ', message['roomname']);
    console.log('Text: ', message['text']);
    console.log('Username: ', message['username']);*/
  var obj = {};
  for (var i = 0; i < data.length; i++) {
    // obj[data.results[i]['text'] = data.results[i]['text'];
    // obj[data.results[i]['username'] = data.results[i]['username'];
    obj[data[i]['roomname']] = data[i]['roomname'];

    let textDiv = document.createElement('p');
    let usernameDiv = document.createElement('h3');

    let textBody = document.createTextNode(data[i]['text']);
    let usernameBody = document.createTextNode(data[i]['username']);
    let element = document.getElementById('chats');

    usernameDiv.appendChild(usernameBody);
    element.appendChild(usernameDiv);
    textDiv.appendChild(textBody);
    element.appendChild(textDiv);

    textDiv.setAttribute('class', 'textBody');
    usernameDiv.setAttribute('class', 'usernameBody'); 


    // $('#send').on('click', function() {
    //   $('#chats').append($('#message').val() + '<br />'); //$('#message').val()
    // });
    }

    app.renderRoom(obj);
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



