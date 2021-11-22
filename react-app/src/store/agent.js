import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : process.env.REACT_APP_API_URL_DEV;

//const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;

const tokenHeader = req => {
    if (token) {
        req.set('authorization', `Token ${token}`);
    }
};

const Auth = {
    current: () =>
        requests.get('/user'),
    login: (email, password) =>
        requests.post('/users/login', { user: { email, password } }),
    register: (data) =>
        requests.post('/users', { user: { ...data } }),
    save: user =>
        requests.put('/user', { user })
};


const Blog = {
    create: (data) => requests.post('/blogs', data),
    getAll: () => requests.get('/blogs'),
    get: (id) => requests.get(`/blogs/${id}`),
    update: (id, data) => requests.put(`/blogs/${id}`, data),
    delete: (id) => requests.delete(`/blogs/${id}`)
};

const Comments = {
    get: (slug) => requests.get(`/blogs/${slug}/comments`),
    create: (slug, comment) => requests.post(`/blogs/${slug}/comments`, { comment }),

};


const requests = {
    del: url =>
        superagent.del(`${API_ROOT}${url}`).use(tokenHeader).then(responseBody),
    get: (url, query = 0) =>
        superagent.get(`${API_ROOT}${url}`, query).use(tokenHeader).then(responseBody),
    put: (url, body) =>
        superagent.put(`${API_ROOT}${url}`, body).use(tokenHeader).then(responseBody),
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`, body).use(tokenHeader).then(responseBody),
};

const setToken = _token => { token = _token; };

const agent = {
    Auth,
    Blog,
    Comments,
    setToken
};

export default agent;