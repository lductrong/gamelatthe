import React, { useState, useEffect } from 'react';
import Card from './Card';
import './App.css';

const App = () => {
  const images = ['🍎', '🍌', '🍒', '🍉', '🍇', '🍍'];  // Danh sách hình ảnh
  const [cards, setCards] = useState([]);  // Lưu trữ tất cả thẻ
  const [flipped, setFlipped] = useState([]);  // Các thẻ đang bị lật
  const [matched, setMatched] = useState([]);  // Các thẻ đã ghép đúng
  const [moves, setMoves] = useState(0);  // Đếm số lượt di chuyển
  const [gameOver, setGameOver] = useState(false);  // Trạng thái trò chơi

  // Tạo bộ thẻ ngẫu nhiên
  useEffect(() => {
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)  // Xáo trộn bộ thẻ
      .map((image, index) => ({
        id: index,
        image,
        isFlipped: false
      }));
    setCards(shuffledCards);
  }, []);

  // Hàm lật thẻ
  const flipCard = (id) => {
    if (flipped.length === 2 || gameOver) return;

    const updatedCards = cards.map(card =>
      card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
    );
    setCards(updatedCards);

    const updatedFlipped = [...flipped, id];
    setFlipped(updatedFlipped);

    if (updatedFlipped.length === 2) {
      setMoves(prevMoves => prevMoves + 1);
      const [firstCard, secondCard] = updatedFlipped.map(id => cards.find(card => card.id === id));

      if (firstCard.image === secondCard.image) {
        setMatched(prevMatched => [...prevMatched, firstCard.image]);
        setFlipped([]);
      } else {
        setTimeout(() => {
          setCards(cards.map(card =>
            flipped.includes(card.id) ? { ...card, isFlipped: false } : card
          ));
          setFlipped([]);
        }, 1000);
      }
    }
  };

  // Kiểm tra khi nào trò chơi kết thúc
  useEffect(() => {
    if (matched.length === images.length) {
      setGameOver(true);
    }
  }, [matched]);

  return (
    <div className="game">
      <h1>Memory Game</h1>
      <div className="score">
        <p>Lượt đi: {moves}</p>
        {gameOver && <p>Chúc mừng! Bạn đã chiến thắng!</p>}
      </div>
      <div className="cards">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            flipCard={flipCard}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
