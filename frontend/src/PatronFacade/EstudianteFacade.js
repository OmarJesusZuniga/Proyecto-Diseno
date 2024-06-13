
import axios from 'axios';

const StudentFacade = {
    async addStudent(studentData) {
        try {
            const response = await axios.post("http://localhost:4000/api/students/", studentData);
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async fetchStudents() {
        try {
            const response = await axios.get('http://localhost:4000/api/students/');
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async fetchSortedStudents(sortOption) {
        try {
            const response = await axios.get(`http://localhost:4000/api/students?sort=${sortOption}`);
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
    
};

export default StudentFacade;
