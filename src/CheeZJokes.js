import React, { Component } from 'react';
import Joke from "./Joke";
import axios from "axios";
import logo from './logo.svg';
import "./CheeZJokes.css";


class CheeZJokes extends Component {
  static defaultProps = {
    numJokes: 10
  };

  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
      ids: []
    };
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
  }

  async componentDidMount() {
    while (this.state.jokes.length < this.props.numJokes) {
      let response = await axios.get(
        'https://icanhazdadjoke.com/',
        { headers: { Accept: "application/json" } }
      );

      if (this.state.ids.includes(response.data.id)) {
        console.log("dupe found!")
        continue;
      }

      this.setState(st => ({
        jokes: [...st.jokes, response.data],
        ids: [...st.ids,response.data.id]
      }));
    }
    console.log(this.state)
  }

  handleUpvote(jokeId) {
    this.setState(st => ({
      jokes: st.jokes.map(joke =>
        joke.id === jokeId
          ?
          { ...joke, score: joke.score + 1 || 1 }
          :
          joke
      )
    }));
  }

  handleDownvote(jokeId) {
    this.setState(st => ({
      jokes: st.jokes.map(joke =>
        joke.id === jokeId
          ?
          { ...joke, score: joke.score - 1 || -1 }
          :
          joke
      )
    }))
  }

  renderLoading() {
    return (
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>Fetching jokes...</p>
      </div>
    )
  }

  renderJokes() {
    return (
      <div>
        {this.state.jokes.map(joke =>
          <Joke
            joke={joke.joke}
            id={joke.id}
            key={joke.id}
            score={joke.score}
            upvote={this.handleUpvote}
            downvote={this.handleDownvote} />
        )}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.state.jokes.length === this.props.numJokes
          ?
          this.renderJokes()
          :
          this.renderLoading()
        }
      </div>
    )
  }
}


export default CheeZJokes;