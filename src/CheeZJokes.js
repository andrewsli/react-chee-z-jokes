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
      jokes: []
    };
    this.handleVote = this.handleVote.bind(this);
  }

  async componentDidMount() {
    // fill state.jokes array until it has the required num of jokes
    while (this.state.jokes.length < this.props.numJokes) {
      let response = await axios.get(
        'https://icanhazdadjoke.com/',
        { headers: { Accept: "application/json" } }
      );

      //skip dupes
      let ids = this.state.jokes.map(joke => joke.id);
      if (ids.includes(response.data.id)) {
        console.log("dupe found!")
        continue;
      }

      //populate states jokes
      this.setState(st => ({
        jokes: [...st.jokes, response.data]
      }));
      //give all jokes a score of 0
      this.setState(st => ({
        jokes: st.jokes.map(joke => ({ ...joke, score: 0 }))
      }));
    }
    console.log(this.state)
  }

  // handles both the upvotes and downvotes
  // changes score of joke with jokeId by delta
  handleVote(jokeId, delta) {
    this.setState(st => ({
      jokes: st.jokes.map(joke =>
        joke.id === jokeId
          ?
          { ...joke, score: joke.score + delta }
          :
          joke
      )
    }));
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
        {this.state.jokes.sort(this.sortByScore).map(joke =>
          <Joke
            joke={joke.joke}
            id={joke.id}
            key={joke.id}
            score={joke.score}
            vote={this.handleVote} />
        )}
      </div>
    )
  }

  sortByScore(a, b) {
    if(a.score < b.score){
      return 1;
    }
    else if (a.score > b.score){
      return -1;
    }
    return 0
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