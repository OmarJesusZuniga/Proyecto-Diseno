
import axios from 'axios';

const CommentFacade = {
    async addComment(commentData) {
        try {
            const response = await axios.post("http://localhost:4000/api/comment/", commentData);
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
};

export default CommentFacade;
