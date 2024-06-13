
import axios from 'axios';

const ActivityStateFacade = {
    async fetchEnums() {
        try {
            const response = await axios.post("http://localhost:4000/api/activityState/getEnums/");
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async fetchActivityState(estadoId) {
        try {
            const response = await axios.get(`http://localhost:4000/api/activityState/${estadoId}`);
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async fetchImagePath() {
        try {
            const response = await axios.post("http://localhost:4000/api/image/getPath/");
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async updateActivityState(estadoId, activityStateData) {
        try {
            const response = await axios.patch(`http://localhost:4000/api/activityState/${estadoId}`, activityStateData);
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
};

export default ActivityStateFacade;
