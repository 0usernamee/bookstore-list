import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import './BookCatalog.css';

const BookCatalog = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        // Read the JSON file using fetch
        const response = await fetch('../data/books.json');
        const data = await response.json();
        
        console.log('API Response:', JSON.stringify(data)); // helps me know how to call the api data
        // only need two books for now - can manipulate the slice data of the variable to increase the books - hopefully
        let booksW = data.slice(0, 10);
        
        const processedBooks = booksW.map((bookData, index) => {
          return {
            id: bookData.isbn13 || `book-${index}`,
            title: bookData.title,
            subtitle: bookData.subtitle || '',
            coverImage: bookData.image,
            price: bookData.price,
            isbn: bookData.isbn13,
            url: bookData.url
          };
        });
        
        console.log('Processed books:', processedBooks);
        setBooks(processedBooks);
        setLoading(false);
        
      } catch (error) {
        console.error('Error loading books from JSON file:', error);
        setError(error.message);
        setLoading(false);
        // displays if the api fails for whatever reason
      }
    };

    loadBooks();
  }, []);

  const handleLearnMore = (book) => {
    console.log('Learn more about:', book.title);
    if (book.url) {
      window.open(book.url, '_blank', 'noopener,noreferrer');
    } else {
      alert(`Learn more about "${book.title}" for ${book.price}\n\nDescription: ${book.description}`);
    }
  };



  if (loading) {
    return (
      <div className="book-catalog">
        <div className="catalog-header">
          <h1>Book Catalog</h1>
        </div>
        <div className="loading">Loading books...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="book-catalog">
        <div className="catalog-header">
          <h1>Book Catalog</h1>
        </div>
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="book-catalog">
      <div className="catalog-header">
        <h1>Book Catalog</h1>
      </div>
      <div className="books-grid">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onLearnMore={handleLearnMore}
          />
        ))}
      </div>
      <div className="catalog-footer">
        <p className='footer-text'>Diego Breakfast</p>
      </div>
    </div>
  );
};

export default BookCatalog;