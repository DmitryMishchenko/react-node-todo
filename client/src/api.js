import axios from 'axios';

export default {
    get(endpoint) {
        return axios({
            method: 'GET',
            url: endpoint,
            headers: { 'Content-Type': 'application/json' }
        }).catch(err => err.response);
    },

    delete(endpoint) {
        return axios({
            method: 'DELETE',
            url: endpoint,
            headers: { 'Content-Type': 'application/json' }
        }).catch(err => err.response);
    },

    post(endpoint, data) {
        return axios({
            method: 'POST',
            url: endpoint,
            data,
            headers: { 'Content-Type': 'application/json' }
        }).catch(err => err.response);
    },

    put(endpoint, data) {
        return axios({
            method: 'PUT',
            url: endpoint,
            data,
            headers: { 'Content-Type': 'application/json' }
        }).catch(err => err.response);
    }
}