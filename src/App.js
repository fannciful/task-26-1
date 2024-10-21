import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [emojis, setEmojis] = useState([
    { id: 1, emoji: "😃", votes: 0 },
    { id: 2, emoji: "😊", votes: 0 },
    { id: 3, emoji: "😎", votes: 0 },
    { id: 4, emoji: "🤩", votes: 0 },
    { id: 5, emoji: "😍", votes: 0 }
  ]);

  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const storedVotes = localStorage.getItem('votes');
    if (storedVotes) {
      setEmojis(JSON.parse(storedVotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('votes', JSON.stringify(emojis));
  }, [emojis]);

  const handleVote = (id) => {
    const updatedEmojis = emojis.map(emoji =>
      emoji.id === id ? { ...emoji, votes: emoji.votes + 1 } : emoji
    );
    setEmojis(updatedEmojis);
  };

  const showResults = () => {
    const maxVotes = Math.max(...emojis.map(emoji => emoji.votes));
    const topEmoji = emojis.find(emoji => emoji.votes === maxVotes);
    setWinner(topEmoji);
  };

  const resetResults = () => {
    const resetEmojis = emojis.map(emoji => ({ ...emoji, votes: 0 }));
    setEmojis(resetEmojis);
    setWinner(null);
    localStorage.setItem('votes', JSON.stringify(resetEmojis));
  };

  return (
    <div className="App">
      <h1>Голосування за найкращий смайлик</h1>
      <div className="emoji-list">
        {emojis.map((emoji) => (
          <div key={emoji.id} className="emoji-item" onClick={() => handleVote(emoji.id)}>
            <span className="emoji">{emoji.emoji}</span>
            <span className="votes">{emoji.votes}</span>
          </div>
        ))}
      </div>
      <button onClick={showResults}>Show Results</button>
      {winner && (
        <div>
          <h2>Переможець: {winner.emoji}</h2>
          <p>Кількість голосів: {winner.votes}</p>
        </div>
      )}
      <button onClick={resetResults}>Очистити результати</button>
    </div>
  );
};

export default App;
