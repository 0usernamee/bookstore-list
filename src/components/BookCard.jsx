import React from 'react';
import './BookCard.css';

const BookCard = ({ book, onLearnMore }) => {
  return (
    <div className="book-card">
      <div className="book-cover">
        {book.coverImage ? (
          <img 
            src={book.coverImage} 
            alt={`${book.title} cover`}
            className="book-cover-image"
            onError={(e) => {
              // acsessability text if the image doesnt load, which should never happen unless internet doesnt work i think
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="book-cover-content" style={{ display: book.coverImage ? 'none' : 'flex' }}>
          <h3 className="book-title">{book.title}</h3>
          <p className="book-price">{book.price}</p>
          <p className="book-author-cover">{book.price}</p>
          <div className="publisher-logo">
            <span className="publisher-text">{book.publisher}</span>
          </div>
        </div>
      </div>
      <div className="book-info">
        <p className="book-price"> {book.price}</p>
        <button 
          className="learn-more-btn"
          onClick={() => onLearnMore(book)}
        >
          Learn more
        </button>
      </div>
    </div>
  );
};

export default BookCard;
