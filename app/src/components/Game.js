import React, { Component } from 'react'

class Game extends Component {
    constructor() {
        super()
        this.state = {
            cardPlay: '',
            cards: []
        }
    }

    render() {
        return (
            <div className="card">
            <form className="card-body" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="number"
                  name="room"
                  className="form-control"
                  placeholder="Room"
                  //onChange={this.handleInput}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="player"
                  className="form-control"
                  placeholder="Player"
                  //onChange={this.handleInput}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Go!
              </button>
            </form>
        </div>
        );
    };
}
