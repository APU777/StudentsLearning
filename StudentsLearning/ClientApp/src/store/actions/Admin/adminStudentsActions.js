import axios from '../../../axios';
import { START_STUDENTS_FETCHING, FETCH_STUDENTS_FAIL, FETCH_STUDENTS_SUCCESS, BLOCK_STUDENT_FAIL, BLOCK_STUDENT_SUCCESS } from './adminTypes';

const convertDate = date => {
    const dateString = new Date(Date.parse(date)).toLocaleDateString();
    const timeString = new Date(Date.parse(date)).toLocaleTimeString();
    return dateString + ' ' + timeString;
}

export const fetchStudents = (sortBy='', isSortAscending = false, search='', currentPage) => {
    if (currentPage === undefined) {
        currentPage = 1;
    }
    const token = localStorage.getItem('token');
    return async dispatch => {
        dispatch(startFetching());
        try {
            const res = await axios.get(`students/GetStudentsForAdmin?sortBy=${sortBy}&isSortAscending=${isSortAscending}&search=${search}&currentPage=${currentPage}`,
                { 'headers': { 'Authorization': 'Bearer ' + token } });
            const pageInfo = JSON.parse(res.headers.pagination);
            const students = [];
            Object.keys(res.data).forEach((key, index) => {
                students.push({
                    id: res.data[index].id,
                    email: res.data[index].email,
                    firstName: res.data[index].firstName,
                    lastName: res.data[index].lastName,
                    age: res.data[index].age,
                    gender: res.data[index].gender,
                    registrationDate: convertDate(res.data[index].registrationDate),
                    blocked: res.data[index].blocked
                })
            });
            dispatch(fetchSuccess(students, pageInfo));
            dispatch(fetchSuccess(res.data, pageInfo));
        } catch (e) {
            dispatch(fetchFail(e));
        }
    }
}

export const startFetching = () => {
    return {
        type: START_STUDENTS_FETCHING,
        loading: true
    }
}

export const fetchFail = e => {
    return {
        type: FETCH_STUDENTS_FAIL,
        loading: false,
        error: e
    }
}

export const fetchSuccess = (students, pageInfo) => {
    const totalPages = [];
    for (let i = 0; i < pageInfo.totalPages; i++) {
        totalPages.push(i + 1);
    }
    return {
        type: FETCH_STUDENTS_SUCCESS,
        loading: false,
        students: students,
        currentPage: pageInfo.currentPage,
        totalPages: totalPages
    }
} 

export const blockStudent = (id) => {
    const token = localStorage.getItem('token');
    console.log(id);
    const studentId = {
        id: id
    }
    return async dispatch => {
        try {
            const res = await axios.post('students/blockStudent/', studentId, { 'headers': { 'Authorization': 'Bearer ' + token } });
            dispatch(blockSuccess(res.data));
            //toast.success(res.data, { containerId: 'subscription' });
        } catch (e) {
            dispatch(blockFail(e.response.data));
            //toast.error(e.response.data, { containerId: 'subscription' });
        }
    }
}

export const blockFail = e => {
    return {
        type: BLOCK_STUDENT_FAIL,
        loading: false,
        error: e
    }
}

export const blockSuccess = successMsg => {
    return {
        type: BLOCK_STUDENT_SUCCESS,
        loading: false,
        success: successMsg
    }
}