import axios from "axios";
import authHeader from "./auth-header";
import currentUser from "./user-info";

const API_URL = "http://localhost:8080/api/books";

const getAllBook = async (orderBy: string, order: string, page: number, size: number, param: string) => {
    const response = await axios.get(API_URL + `?orderBy=${orderBy}&order=${order}&page=${page}&size=${size}&${param}`);
    return response.data;
};

const getAllBookEnabled = async (page: number, param: string) => {
    const response = await axios.get(API_URL + `/enabled?&page=${page}&size=8&${param}`);
    return response.data;
};

const getBookById = async (bookId: number) => {
    const response = await axios.get(API_URL + `/${bookId}`);
    return response.data;
};

const getBooksByUserId = async (page: number, size: number, param: string) => {
    const response = await axios.get(API_URL + `/user/${currentUser().userId}?page=${page}&size=${size}&${param}`);
    return response.data;
};

// const getBooksByCategoryId = async (categoryId: number) => {
//   const response = await axios.get(API_URL + `/category/${categoryId}`);
//   return response.data;
// };

// const getBooksByKeyword = async (keyword: string) => {
//   const response = await axios.get(API_URL + `/search?keyword=${keyword}`);
//   return response.data;
// }

const addBook = async (book: Book) => {
    const response = await axios.post(API_URL + `/${currentUser().userId}`, JSON.stringify(book), { headers: authHeader() });
    return response.data;
};

const updateBook = async (book: Book, bookId: number, userId: number | undefined) => {
    const response = await axios.put(API_URL + `/${bookId}/${userId}`, JSON.stringify(book), { headers: authHeader() });
    return response.data;
};

const deleteBook = async (bookId: number) => {
    const response = await axios.delete(API_URL + `/${bookId}`, { headers: authHeader() });
    return response.headers;
};

const bookService = {
    getAllBook,
    getAllBookEnabled,
    // getBooksByKeyword,
    addBook,
    getBooksByUserId,
    updateBook,
    deleteBook,
    // getBooksByCategoryId,
    getBookById
};

export default bookService;
