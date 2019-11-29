import React, { Component } from "react";
import axios from "axios";

export default class roomCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      room: ""
    };
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCreateRoom(event) {
    const { room } = this.state;
    axios
      .post("http://localhost:8080/room/createRoom", {
        room: room
      })
      .then(response => {
        if (response.status === 200) {
          alert("Room created, please join Room");
        }
      })
      .catch(error => {
        alert("Error creating room");
      });
    event.preventDefault();
  }

  handleJoinRoom(event) {
    const { name, room } = this.state;
    axios
      .post("http://localhost:8080/room/joinRoom", {
        room: room,
        name: name
      })
      .then(response => {
        if (response.status === 200) {
          alert("Welcome");
        }
      })
      .catch(error => {
        alert("Error creating room");
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleCreateRoom}>
          <input name="room" placeholder="Room name" />
          <button type="submit"> Create Room</button>
        </form>
        <form onSubmit={this.handleJoinRoom}>
          <input name="room" placeholder="Room name" />
          <input name="name" placeholder="Username" />
          <button type="submit"> Create Room</button>
        </form>
      </div>
    );
  }
}
