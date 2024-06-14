// services/GuideTeamFacade.js
import axios from 'axios';

const SideBarProfeFacade = {
    async fetchProfessorTeams(id) {
        try {
            const response = await axios.post('http://localhost:4000/api/guideTeam/profe/get', { id });
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async fetchGuideTeam(id) {
        try {
            console.log('hola');
            const response = await axios.get(`http://localhost:4000/api/guideTeam/${id}`);
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
};

export default SideBarProfeFacade;
