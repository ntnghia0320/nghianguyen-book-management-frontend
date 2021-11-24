import axios from "axios";
import { API_URL } from "../const";
import authHeader from "./auth-header";
import currentUser from "./user-info";

const getAllBook = async (orderBy: string, order: string, page: number, size: number, param: string) => {
    const response = await axios.get(API_URL + `/books?orderBy=${orderBy}&order=${order}&page=${page}&size=${size}&${param}`);
    return response.data;
};

const getAllBookEnabled = async (page: number, param: string) => {
    const response = await axios.get(API_URL + `/books/enabled?&page=${page}&size=8&${param}`);
    return response.data;
};

const getBookById = async (bookId: number) => {
    const response = await axios.get(API_URL + `/books/${bookId}`);
    return response.data;
};

const getBooksByUserId = async (page: number, size: number, param: string) => {
    const response = await axios.get(API_URL + `/books/user/${currentUser().userId}?page=${page}&size=${size}&${param}`);
    return response.data;
};

const addBook = async (book: Book) => {
    const response = await axios.post(API_URL + `/books/${currentUser().userId}`, JSON.stringify(book), { headers: authHeader() });
    return response.data;
};

const updateBook = async (book: Book, bookId: number, userId: number | undefined) => {
    const response = await axios.put(API_URL + `/books/${bookId}/${userId}`, JSON.stringify(book), { headers: authHeader() });
    return response.data;
};

const deleteBook = async (bookId: number) => {
    const response = await axios.delete(API_URL + `/books/${bookId}`, { headers: authHeader() });
    return response.headers;
};

const bookService = {
    getAllBook,
    getAllBookEnabled,
    addBook,
    getBooksByUserId,
    updateBook,
    deleteBook,
    getBookById
};

export default bookService;
