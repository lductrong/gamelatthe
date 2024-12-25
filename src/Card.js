import React from 'react';

const Card = ({ card, flipCard }) => {
  return (
    <div
      className={`card ${card.isFlipped ? 'flipped' : ''}`}
      onClick={() => flipCard(card.id)}
    >
      {card.isFlipped ? card.image : '❓'}
    </div>
  );
};

export default Card;
