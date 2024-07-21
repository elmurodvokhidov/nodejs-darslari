import api from "./api";
import { getFromLocalStorage } from "./localstorage.js";

api.interceptors.request.use((req) => {
    const token = getFromLocalStorage("token");
    if (token) {
        req.headers.Authorization = token;
    }
    return req;
});

const Service = {
    // auth
    async resgisterAuth(auth) {
        const response = await api.post('/auth/signup', auth);
        return response;
    },
    async loginAuth(auth) {
        const response = await api.post('/auth/signin', auth);
        return response;
    },
    async getAuth() {
        const response = await api.get('/auth');
        return response;
    },
    async findUserByEmail(email) {
        const response = await api.post('/auth/find-user-by-email', { email });
        return response;
    },
    async updatePassword(userId, uniqueId, passwords) {
        const response = await api.put(`/auth/update-password/${userId}/${uniqueId}`, passwords);
        return response;
    },
    async payment(data) {
        const response = await api.post('/auth/payment', data);
        return response;
    },


    // books
    async getAllBooks(nomi, cat) {
        const response = await api.get(`/books?nomi=${nomi}&cat=${cat}`);
        return response;
    },
    async createNewBook(newBook) {
        const response = await api.post("/books", newBook);
        return response;
    },
    async getOneBook(id) {
        const response = await api.get(`/books/${id}`);
        return response;
    },
    async updateBook(id, book) {
        const response = await api.put(`/books/${id}`, book);
        return response;
    },
    async deleteBook(id) {
        const response = await api.delete(`/books/${id}`);
        return response;
    },
    async addToBasket(userId, bookId) {
        const response = await api.post(`/books/${userId}/basket/${bookId}`);
        return response;
    },
    async deleteFromBasket(userId, bookId) {
        const response = await api.delete(`/auth/${userId}/basket/${bookId}`);
        return response;
    },
    async addComment(bookId, comment) {
        const response = await api.put(`/books/comment/${bookId}`, comment);
        return response;
    },
    async incAndDec(userId, id, type) {
        const response = await api.put(`/auth/${userId}/basket/${id}`, { type });
        return response;
    },
    async toggleLike(userId, bookId) {
        const response = await api.post(`/books/${userId}/wishlist/${bookId}`);
        return response;
    },


    // category
    async updateCategory(id, category) {
        const response = await api.put(`/category/${id}`, category);
        return response;
    },
    async getAllCategory() {
        const response = await api.get("/category");
        return response;
    },
};

export default Service;