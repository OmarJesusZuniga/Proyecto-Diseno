
import axios from 'axios';

const SideBarFacade = {
    async fetchAssistantTeams(id) {
        try {
            const response = await axios.post('http://localhost:4000/api/guideTeam/assistant/get', { id });
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async fetchGuideTeam(id) {
        try {
            const response = await axios.get(`http://localhost:4000/api/guideTeam/${id}`);
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async createTeam(data) {
        try {
            const response = await axios.post('http://localhost:4000/api/guideTeam/createTeam', data);
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async createPlan(professorId) {
        try {
            const response = await axios.post('http://localhost:4000/api/plan/', { profesorId });
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async fetchProfessorsByCampus(campus) {
        try {
            const response = await axios.get(`http://localhost:4000/api/professors/profesByCampus/${campus}`);
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async createStudent(data) {
        try {
            const response = await axios.post('http://localhost:4000/api/students/', data);
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
};

export default SideBarFacade;
