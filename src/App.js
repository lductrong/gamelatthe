// App.js

import React, { useState, useEffect } from 'react';
import Card from './Card';
import './App.css';
import image1 from './image/1.jpg';
import image2 from './image/2.jpg';
import image3 from './image/3.jpg';
import image4 from './image/4.jpg';
import image5 from './image/5.jpg';
import image6 from './image/6.jpg';

const App = () => {
  const images = [image1, image2, image3, image4, image5, image6]; // Danh sách hình ảnh
  const [cards, setCards] = useState([]); // Lưu trữ tất cả thẻ
  const [flipped, setFlipped] = useState([]); // Các thẻ đang bị lật
  const [moves, setMoves] = useState(0); // Đếm số lượt di chuyển
  const [gameOver, setGameOver] = useState(false); // Trạng thái trò chơi
  const [score, setScore] = useState(0);

  // Tạo bộ thẻ ngẫu nhiên
  useEffect(() => {
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5) // Xáo trộn bộ thẻ
      .map((image, index) => ({
        id: index,
        image,
        isFlipped: false,
        isMatched: false, // Thêm trạng thái ghép đúng
      }));
    setCards(shuffledCards);
  }, []);

  // Hàm lật thẻ
  const flipCard = (id) => {
    const clickedCard = cards.find((card) => card.id === id);
    if (flipped.length === 2 || clickedCard.isMatched || clickedCard.isFlipped || gameOver) return;

    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    const updatedFlipped = [...flipped, id];
    setFlipped(updatedFlipped);

    if (updatedFlipped.length === 2) {
      setMoves((prevMoves) => prevMoves + 1);

      const [firstCard, secondCard] = updatedFlipped.map((id) =>
        cards.find((card) => card.id === id)
      );

      if (firstCard.image === secondCard.image) {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              updatedFlipped.includes(card.id)
                ? { ...card, isMatched: true }
                : card
            )
          );
          setFlipped([]);
          setScore((prevScore) => prevScore + 1); // Cập nhật điểm
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              updatedFlipped.includes(card.id)
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlipped([]);
        }, 1000);
      }
    }
  };

  // Kiểm tra khi nào trò chơi kết thúc
  useEffect(() => {
    if (score === images.length) {
      setGameOver(true);
    }
  }, [score]);

  return (
    <div className="game">
      <h1>Memory Game</h1>
      <div className="score">
        <p>Điểm: {score}</p>
        <p>Lượt đi: {moves}</p>
        {gameOver && <p>Chúc mừng! Bạn đã chiến thắng!</p>}
      </div>
      <div className="cards">
        {cards.map((card) => (
          <Card key={card.id} card={card} flipCard={flipCard} />
        ))}
      </div>
    </div>
  );
};

export default App;
