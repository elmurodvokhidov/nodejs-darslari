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
        const response = await api.post('/api/auth/signup', auth);
        return response;
    },
    async loginAuth(auth) {
        const response = await api.post('/api/auth/signin', auth);
        return response;
    },
    async getAuth() {
        const response = await api.get('/api/auth');
        return response;
    },


    // books
    async getAllBooks() {
        const response = await api.get("/api/books");
        return response;
    },
    async createNewBook(newBook) {
        const response = await api.post("/api/books", newBook);
        return response;
    },
    async getOneBook(id) {
        const response = await api.get(`/api/books/${id}`);
        return response;
    },


    // category
    async updateCategory(id, category) {
        const response = await api.put(`/api/category/${id}`, category);
        return response;
    },
    async getAllCategory() {
        const response = await api.get("/api/category");
        return response;
    },
};

export default Service;