import axios from '../../../axios';
import { toast } from "react-toastify";
import {
    COURSES_START,
    COURSES_SUCCESS,
    COURSES_ERROR,
    START_SUBSCRIBING,
    SUBSCRIBE_ERROR,
    SUBSCRIPTION_SUCCESSFULL,
    START_FETCHING_SINGLE_COURSE,
    FETCH_SINGLE_COURSE_SUCCESS,
    FETCH_SINGLE_COURSE_ERROR,
    UPDATE_COURSE_START,
    UPDATE_COURSE_ERROR,
    UPDATE_COURSE_SUCCESS,
    ADD_COURSE_ERROR,
    ADD_COURSE_SUCCESS,
    ADD_COURSE_START,
    DELETE_COURSE_START,
    DELETE_COURSE_SUCCESS,
    DELETE_COURSE_ERROR,
    START_COURSES_SEARCH_FETCHING,
    FETCH_COURSES_SEARCH_SUCCESS,
    FETCH_COURSES_SEARCH_FAIL,
    UPDATE_IMAGE
} from './coursesTypes';

export const fetchCourses = (currentPage) => {
    return async dispatch => {
        dispatch(startFetchCourses());
        try {
            if (currentPage === undefined) {
                currentPage = 1
            }
            const response = await axios.get('courses/GetCourses', { params: { currentPage } });
            const courses = [];
            const pageInfo = JSON.parse(response.headers.pagination);
            Object.keys(response.data).forEach((key, index) => {
                courses.push({
                    id: response.data[index].id,
                    name: response.data[index].courseName,
                    description: response.data[index].description,
                    imageUrl: response.data[index].imageUrl
                })
            });
            dispatch(fetchCoursesSuccess(courses, pageInfo));
        } catch (e) {
            dispatch(fetchCoursesError(e));
        }
    }
}

export const fetchCourseById = id => {
    return async dispatch => {
        dispatch(startFetchingCourse());
        try {
            const res = await axios.get(`courses/GetCourse/${id}`);
            const course = {
                id: res.data.id,
                courseName: res.data.courseName,
                description: res.data.description,
                imageUrl: res.data.imageUrl
            };
            dispatch(fetchCourseSuccess(course));
        } catch (e) {
            dispatch(fetchCourseError(e));
        }
    }
}

export const startFetchingCourse = () => {
    return {
        type: START_FETCHING_SINGLE_COURSE,
        loading: true,
        course: null
    }
}

export const fetchCourseSuccess = (course) => {
    return {
        type: FETCH_SINGLE_COURSE_SUCCESS,
        course: course,
        loading: false
    }
}

export const fetchCourseError = e => {
    return {
        type: FETCH_SINGLE_COURSE_ERROR,
        loading: false,
        error: e
    }
}

export const startFetchCourses = () => {
    return {
        type: COURSES_START,
        loading: true
    }
}

export const fetchCoursesSuccess = (courses, pageInfo) => {
    const totalPages = [];
    for (let i = 0; i < pageInfo.totalPages; i++) {
        totalPages.push(i + 1);
    }
    return {
        type: COURSES_SUCCESS,
        courses,
        loading: false,
        currentPage: pageInfo.currentPage,
        totalPages: totalPages
    }
}

export const fetchCoursesError = e => {
    return {
        type: COURSES_ERROR,
        error: e,
        loading: false
    }
}

export const subscribeToCourse = (courseId, dt) => {
    var day = dt.getDate().toString().padStart(2, "0");
    var month = (dt.getMonth() + 1).toString().padStart(2, "0");
    var year = dt.getFullYear();
    var hour = dt.getHours().toString().padStart(2, "0");
    var minute = dt.getMinutes().toString().padStart(2, "0");
    var second = dt.getSeconds().toString().padStart(2, "0");
    
    const startDate = day + "/" + month + "/" + year + " " + hour + ':' + minute + ':' + second;

    console.log(startDate);

    const token = localStorage.getItem('token');
    const courseData = { courseId, startDate };
    return async dispatch => {
        dispatch(startSubscribing());
        try {
            const res = await axios.post('courses/registerToCourse', courseData, { 'headers': { 'Authorization': 'Bearer ' + token } });
            dispatch(subscribtionSuccessfull(res.data));
            toast.success(res.data, { containerId: 'subscription' });
        } catch (e) {
            dispatch(subscribeError(e.response.data));
            toast.error(e.response.data, { containerId: 'subscription' });
        }
    }
}

export const subscribtionSuccessfull = successMsg => {
    return {
        type: SUBSCRIPTION_SUCCESSFULL,
        loading: false,
        success: successMsg
    }
}

export const startSubscribing = () => {
    return {
        type: START_SUBSCRIBING,
        loading: true
    }
}

export const subscribeError = e => {
    return {
        type: SUBSCRIBE_ERROR,
        loading: false,
        error: e
    }
}

export const updateCourse = (courseData) => {
    const token = localStorage.getItem('token');
    return async dispatch => {
        dispatch(startUpdatingCourse());
        try {
            const res = await axios.put('courses/updateCourse', courseData, { 'headers'
            : { 'Authorization': 'Bearer ' + token } });
            dispatch(fetchCourseById(courseData.id));
        } catch (e) {
            dispatch(updateCourseError(e.response.data));
        }
    }
}

export const startUpdatingCourse = () => {
    return {
        type: UPDATE_COURSE_START,
        loading: true,
        error: null
    }
}

export const updateCourseError = e => {
    return {
        type: UPDATE_COURSE_ERROR,
        loading: false,
        error: e
    }
}

export const updatedCourseSuccess = successMsg => {
    return {
        type: UPDATE_COURSE_SUCCESS,
        loading: false,
        success: successMsg
    }
}

export const updateImage = image => {
    return {
        type: UPDATE_IMAGE,
        image: image
    }
}

export const deleteCourseById = id => {
    const token = localStorage.getItem('token');
    return async dispatch => {
        dispatch(deleteCourseStart())
        try {
            const res = await axios.delete(`courses/deleteCourse/${id}`, { 'headers': { 'Authorization': 'Bearer ' + token } });
            dispatch(deleteCourseSuccess(res.data));
        } catch (e) {
            dispatch(deleteCourseError(e.response.data));
        }
    }
}

export const deleteCourseStart = e => {
    return {
        type: DELETE_COURSE_START,
        loading: true,
        error: null
    }
}

export const deleteCourseError = e => {
    return {
        type: DELETE_COURSE_ERROR,
        loading: false,
        error: e
    }
}

export const deleteCourseSuccess = successMsg => {
    return {
        type: DELETE_COURSE_SUCCESS,
        loading: false,
        success: successMsg
    }
}

export const addCourse = (courseData) => {
    const token = localStorage.getItem('token');
    return async dispatch => {
        dispatch(startUpdatingCourse());
        try {
            const res = await axios.post('courses/addCourse', courseData, { 'headers': { 'Authorization': 'Bearer ' + token } });
            dispatch(addCourseSuccess(res.data));
            //toast.success(res.data, { containerId: 'subscription' });
        } catch (e) {
            dispatch(addCourseError(e.response.data));
            //toast.error(e.response.data, { containerId: 'subscription' });
        }
    }
}

export const startAddingCourse = () => {
    return {
        type: ADD_COURSE_START,
        loading: true,
        error: null
    }
}

export const addCourseError = e => {
    return {
        type: ADD_COURSE_ERROR,
        loading: false,
        error: e
    }
}

export const addCourseSuccess = successMsg => {
    return {
        type: ADD_COURSE_SUCCESS,
        loading: false,
        success: successMsg
    }
}

export const fetchCoursesSearch = (sortBy='', isSortAscending = false, search='', currentPage) => {
    if (currentPage === undefined) {
        currentPage = 1;
    }
    const token = localStorage.getItem('token');

    console.log("Search! => " + search);

    return async dispatch => {
        dispatch(startFetchingSearch());
        try {
            const res = await axios.get(`courses/GetCoursesForUser?sortBy=${sortBy}&isSortAscending=${isSortAscending}&search=${search}&currentPage=${currentPage}`,
                { 'headers': { 'Authorization': 'Bearer ' + token } });
            const pageInfo = JSON.parse(res.headers.pagination);
            const courses = [];
            Object.keys(res.data).forEach((key, index) => {
                courses.push({
                    id: res.data[index].id,
                    name: res.data[index].courseName,
                    description: res.data[index].description,
                    imageUrl: res.data[index].imageUrl
                })
            });
            dispatch(fetchSuccessSearch(courses, pageInfo));
        } catch (e) {
            dispatch(fetchFailSearch(e));
        }
    }
}

export const startFetchingSearch = () => {
    return {
        type: START_COURSES_SEARCH_FETCHING,
        loading: true
    }
}

export const fetchSuccessSearch = (courses, pageInfo) => {
    const totalPages = [];
    for (let i = 0; i < pageInfo.totalPages; i++) {
        totalPages.push(i + 1);
    }
    return {
        type: FETCH_COURSES_SEARCH_SUCCESS,
        loading: false,
        courses: courses,
        currentPage: pageInfo.currentPage,
        totalPages: totalPages
    }
}

export const fetchFailSearch = e => {
    return {
        type: FETCH_COURSES_SEARCH_FAIL,
        loading: false,
        error: e
    }
}