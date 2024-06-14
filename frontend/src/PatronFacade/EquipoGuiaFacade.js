
import axios from 'axios';

const GuideTeamFacade = {
    async addProfessorToTeam(guideTeamId, professorId) {
        try {
            const response = await axios.post('http://localhost:4000/api/guideTeam/addProfe/', { guideTeamId, professorId });
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async addGuideProfessor(guideTeamId, professorId) {
        try {
            const response = await axios.patch(`http://localhost:4000/api/guideTeam/addGuideProf/${guideTeamId}/${professorId}`);
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async fetchGuideTeam(grupoId) {
        try {
            console.log('hola');
            const response = await axios.get(`http://localhost:4000/api/guideTeam/${grupoId}`);
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async fetchPlan(planId) {
        try {
            const response = await axios.get(`http://localhost:4000/api/plan/${planId}`);
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
};

export default GuideTeamFacade;
