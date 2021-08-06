import React, { useEffect, useState } from 'react';
import bookService from '../../services/book.service';
import ListBooks from '../common/ListBooks';

export default function Home() {
    const postDefault: Book[] = [];

    const [books, setBooks] = useState(postDefault);

    useEffect(() => {
        // bookService.getAllBook().then(
        //     (res) => {
        //         setBooks(res);
        //     },
        //     (error) => {
        //         alert(error.message)
        //     }
        // );
        console.log('Home');
    }, []);

    return (
        <ListBooks books={books} />
    );
}
