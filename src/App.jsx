import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';


const data = {
  currentUser: {name: "Anand"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: []
};

class App extends Component {

constructor(props) {
  super(props);
  this.state = data
}
  // in App.jsx
componentDidMount() {
  // console.log("componentDidMount <App />");
  this.socket = new WebSocket("ws://0.0.0.0:3001/socketserver")
  //console.log(this.socket);\
  this.socket.onmessage = (event) => {
    console.log('message received:', event);
    //const message = JSON.parse(event.data);
    //this.receiveMessage(JSON.parse(event));
  }
  setTimeout(() => {
    // console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}

handleMsg = (e) => {
  // console.log('handleMsg', e.key, e.target.value);
  if(e.key === 'Enter'){
      let newMessage = {
            id: 3,
            username: this.state.currentUser.name,
            content: e.target.value
          }
      const data = this.state;
      this.state.messages.push(newMessage)
      this.socket.send(JSON.stringify(newMessage));
      this.setState(data: data);
  }
}

handleUser = (e) => {
  if(e.key === 'Enter'){
      let newUser = e.target.value;
      console.log(`newUser: ${newUser}`);
      // console.log(this.state);
      this.setState({currentUser: {name: newUser}})
  }
}

  render(){
    console.log("Rendering <App/>");
      return (
        <div>
        <nav className='navbar'>
          <a href="/" className="navbar-brand">Chatty App</a>
        </nav>
        <MessageList messages={this.state.messages}  />
        <ChatBar username={this.handleUser}
                 message={this.handleMsg}
        />
        </div>
    );
  }
}

export default App;
