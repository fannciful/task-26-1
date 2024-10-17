import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emojis: [
        { id: 1, emoji: "😃", votes: 0 },
        { id: 2, emoji: "😊", votes: 0 },
        { id: 3, emoji: "😎", votes: 0 },
        { id: 4, emoji: "🤩", votes: 0 },
        { id: 5, emoji: "😍", votes: 0 }
      ],
      winner: null
    };
  }

  componentDidMount() {
    const storedVotes = localStorage.getItem('votes');
    if (storedVotes) {
      this.setState({ emojis: JSON.parse(storedVotes) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.emojis !== this.state.emojis) {
      localStorage.setItem('votes', JSON.stringify(this.state.emojis));
    }
  }

  handleVote = (id) => {
    const updatedEmojis = this.state.emojis.map(emoji =>
      emoji.id === id ? { ...emoji, votes: emoji.votes + 1 } : emoji
    );
    this.setState({ emojis: updatedEmojis });
  };

  showResults = () => {
    const maxVotes = Math.max(...this.state.emojis.map(emoji => emoji.votes));
    const topEmoji = this.state.emojis.find(emoji => emoji.votes === maxVotes);
    this.setState({ winner: topEmoji });
  };

  resetResults = () => {
    const resetEmojis = this.state.emojis.map(emoji => ({ ...emoji, votes: 0 }));
    this.setState({ emojis: resetEmojis, winner: null });
    localStorage.setItem('votes', JSON.stringify(resetEmojis));
  };

  render() {
    return (
      <div className="App">
        <h1>Голосування за найкращий смайлик</h1>
        <div className="emoji-list">
          {this.state.emojis.map((emoji) => (
            <div key={emoji.id} className="emoji-item" onClick={() => this.handleVote(emoji.id)}>
              <span className="emoji">{emoji.emoji}</span>
              <span className="votes">{emoji.votes}</span>
            </div>
          ))}
        </div>
        <button onClick={this.showResults}>Show Results</button>
        {this.state.winner && (
          <div>
            <h2>Переможець: {this.state.winner.emoji}</h2>
            <p>Кількість голосів: {this.state.winner.votes}</p>
          </div>
        )}
        <button onClick={this.resetResults}>Очистити результати</button>
      </div>
    );
  }
}

export default App;
