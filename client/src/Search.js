import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function Search() {
    const [books, setBooks] = useState(null);

    const fetchData = async () => {
        const response = await axios.get(
            'https://www.anapioficeandfire.com/api/books?pageSize=30'
        );
        setBooks(response.data);
    };

    return (
        <div className="Search">
            {/* Fetch data from API */}
            <div>
                <button className="fetch-button" onClick={fetchData}>
                    Fetch Data
                </button>
                <br />
            </div>
            {/* Display data from API */}
            <div className="books">
                {books &&
                books.map((book, index) => {
                    const cleanedDate = new Date(book.released).toDateString();
                    const authors = book.authors.join(', ');

                    return (
                        <div className="book" key={index}>
                            <h3>Book {index + 1}</h3>
                            <h2>{book.name}</h2>

                            <div className="details">
                                <p><span role="img" aria-label="man">👨</span>: {authors}</p>
                                <p><span role="img" aria-label="book">📖</span>: {book.numberOfPages} pages</p>
                                <p><span role="img" aria-label="house">🏘️</span>: {book.country}</p>
                                <p><span role="img" aria-label="clock">⏰</span>: {cleanedDate}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Search