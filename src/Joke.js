import React, { Component } from 'react';
import "./Joke.css"

class Joke extends Component {
  static defaultProps = {
    score: 0
  }

  constructor(props) {
    super(props);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
  }

  handleUpvote() {
    this.props.vote(this.props.id, 1);
  }

  handleDownvote() {
    this.props.vote(this.props.id, -1);
  }

  renderUpvote() {
    return (
      <button
        className="btn"
        onClick={this.handleUpvote}>
        <i className="fas fa-arrow-up"></i>
      </button>
    )
  }

  renderDownvote() {
    return (
      <button
        className="btn"
        onClick={this.handleDownvote}>
        <i className="fas fa-arrow-down"></i>
      </button>
    )
  }

  render() {
    return (
      <div className="joke" >

        {/* upvote button */}
        {this.renderUpvote()}
        <br />

        {/* score and joke */}
        <div className="score">{this.props.score}</div>
        {this.props.joke}
        <br />

        {/* downvote button */}
        {this.renderDownvote()}
        <br />
      </div>
    )
  }
}

export default Joke;