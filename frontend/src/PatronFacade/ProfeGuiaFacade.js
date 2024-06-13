
import axios from 'axios';

const GuideProfessorFacade = {
    async removeGuideProfessor(guideTeamId, professorId) {
        try {
            const response = await axios.post("http://localhost:4000/api/guideTeam/removeProfe/", { guideTeamId, professorId });
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
};

export default GuideProfessorFacade;
