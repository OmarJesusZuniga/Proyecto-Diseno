
import axios from 'axios';

const ObservationFacade = {
    async addObservation(observationData) {
        try {
            const response = await axios.post("http://localhost:4000/api/observation/", observationData);
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async fetchObservation(idObservation) {
        try {
            const response = await axios.get(`http://localhost:4000/api/observation/${idObservation}`);
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
};

export default ObservationFacade;
