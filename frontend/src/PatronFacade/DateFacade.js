
import axios from 'axios';

const DateFacade = {
    async getSystemDate() {
        try {
            const response = await axios.get('http://localhost:4000/api/systemDate');
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async updateSystemDate(newDate) {
        try {
            const response = await axios.patch('http://localhost:4000/api/systemDate', { date: newDate });
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async notifyObeserver() {
        try {
            
            const response = await axios.post('http://localhost:4000/api/observer');
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async resetSystemDate() {
        try {
            const date = new Date();
            const response = await axios.patch('http://localhost:4000/api/systemDate', { date: date });
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
};

export default DateFacade;
