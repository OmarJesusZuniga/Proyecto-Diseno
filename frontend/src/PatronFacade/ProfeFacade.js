import axios from 'axios';

const ProfessorFacade = {
    async getPath() {
        try {
            const response = await axios.post("http://localhost:4000/api/image/getPath/");
            return response.data.path;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async getLastProfessorCode(campus) {
        try {
            const response = await axios.get(`http://localhost:4000/api/professors/lastProf/${campus}`);
            return response.data.code;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async addProfessor(professorData) {
        try {
            await axios.post('http://localhost:4000/api/professors/', professorData);
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async fetchProfessor(professorId) {
        try {
            const response = await axios.get(`http://localhost:4000/api/professors/${professorId}`);
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async removeGuideProfessor(equipoId) {
        try {
            const response = await axios.patch(`http://localhost:4000/api/guideTeam/revomeGuideProf/${equipoId}`);
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async fetchProfessors() {
        try {
            const response = await axios.get('http://localhost:4000/api/professors/');
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
    
};

export default ProfessorFacade;