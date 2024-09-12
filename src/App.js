import React, { useState, useEffect } from 'react';

const Dice = ({ value }) => {
  const emojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  return (
    <span style={{ fontSize: '80px', margin: '0 10px' }}>
      {emojis[value - 1]}
    </span>
  );
};

const DiceGame = () => {
  const [dice, setDice] = useState([1, 1]);
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const [wins, setWins] = useState(0);
  const [totalGames, setTotalGames] = useState(0);

  useEffect(() => {
    if (messageColor) {
      document.body.style.backgroundColor = messageColor === 'green' ? '#d4edda' : '#f8d7da';
      const timeout = setTimeout(() => {
        document.body.style.backgroundColor = '#fff';
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [messageColor]);

  const rollDice = () => {
    const newDice = [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
    ];
    setDice(newDice);

    const sum = newDice[0] + newDice[1];
    setTotalGames(totalGames + 1);

    if (sum === 7 || sum === 11) {
      setMessage('Parabéns, você ganhou!');
      setMessageColor('green');
      setWins(wins + 1);
    } else {
      setMessage('Que pena, você perdeu!');
      setMessageColor('red');
    }
  };

  const winPercentage = totalGames > 0 ? ((wins / totalGames) * 100).toFixed(2) : 0;

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px' }}>
      <h1>Jogo de Dados 🎲</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        {/* Componente Dice sendo usado */}
        <Dice value={dice[0]} />
        <Dice value={dice[1]} />
      </div>
      <button
        onClick={rollDice}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '18px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
      >
        Jogar Dados
      </button>
      <div style={{ marginTop: '20px' }}>
        <h3 style={{ color: messageColor, fontSize: '24px' }}>{message}</h3>
        <p style={{ fontSize: '18px', color: '#333' }}>
          Vitórias: {wins} / Jogadas Totais: {totalGames} = {winPercentage}%
        </p>
      </div>
    </div>
  );
};

export default DiceGame;
