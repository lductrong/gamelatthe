import React from 'react';
import face from './image/face.jpg'; // Hình ảnh mặt sau của thẻ

const Card = ({ card, flipCard }) => {
  return (
    <div
      className={`card ${card.isFlipped ? 'flipped' : ''}`}
      onClick={() => flipCard(card.id)}
    >
      {/* Hiển thị mặt trước nếu thẻ đang lật hoặc đã ghép đôi */}
      {card.isFlipped ? (
        <img src={card.image} alt="Card" />
      ) : (
        // Hiển thị mặt sau nếu thẻ chưa lật
        <div className="back-face">
          <img src={face} alt="Back face" />
        </div>
      )}
    </div>
  );
};

export default Card;
