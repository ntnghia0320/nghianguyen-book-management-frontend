import axios from "axios";
import authHeader from "./auth-header";
import currentUser from "./user-info";

const API_URL = "http://localhost:8080/api/comments";

// const getAllBook = async (orderBy: string, order: string, page: number, size: number, param: string) => {
//     const response = await axios.get(API_URL + `?orderBy=${orderBy}&order=${order}&page=${page}&size=${size}&${param}`);
//     return response.data;
// };

// const getAllBookEnabled = async (page: number, param: string) => {
//     const response = await axios.get(API_URL + `/enabled-book?&page=${page}&size=8&${param}`);
//     return response.data;
// };

const getCommentById = async (commentId: number) => {
    const response = await axios.get(API_URL + `/${commentId}`);
    return response.data;
};

const getCommentByBookId = async (bookId: number) => {
    const response = await axios.get(API_URL + `/book/${bookId}`);
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

const addComment = async (comment: Comment, bookId: number) => {
    const response = await axios.post(API_URL + `/${currentUser().userId}/${bookId}`, JSON.stringify(comment), { headers: authHeader() });
    return response;
};

const updateComment = async (comment: Comment, commentId: number, userId: number | undefined, bookId: number | undefined) => {
    const response = await axios.put(API_URL + `/${commentId}/${userId}/${bookId}`, JSON.stringify(comment), { headers: authHeader() });
    return response.data;
};

const deleteComment = async (commentId: number) => {
    const response = await axios.delete(API_URL + `/${commentId}`, { headers: authHeader() });
    return response.headers;
};

const commentService = {
    getCommentByBookId,
    // getAllBookEnabled,
    // getBooksByKeyword,
    addComment,
    // getBooksByUserId,
    updateComment,
    deleteComment,
    // getBooksByCategoryId,
    getCommentById
};

export default commentService;