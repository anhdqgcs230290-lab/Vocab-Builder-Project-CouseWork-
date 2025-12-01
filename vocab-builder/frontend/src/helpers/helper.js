import axios from 'axios';

const baseURL = 'http://localhost:3000/api/vocab';

const handleError = fn => (...params) =>
    fn(...params).catch(err => {
        //  Dùng window.vm.$toasted
        const message = err.response
            ? `${err.response.status}: ${err.response.statusText}`
            : 'Network Error';

        if (window.vm) {
            window.vm.$toasted.error(message);
        }
        console.error(' API Error:', err);
    });

export const api = {
    getWord: handleError(async id => {
        const res = await axios.get(`${baseURL}/${id}`);
        return res.data;
    }),
    getWords: handleError(async () => {
        const res = await axios.get(baseURL);
        return res.data;
    }),
    deleteWord: handleError(async id => {
        const res = await axios.delete(`${baseURL}/${id}`);
        return res.data;
    }),
    createWord: handleError(async payload => {
        const res = await axios.post(baseURL, payload);
        return res.data;
    }),
    updateWord: handleError(async (id, payload) => {
        const res = await axios.put(`${baseURL}/${id}`, payload);
        return res.data;
    }),
};