import {
    COURSES_SUCCESS,
    COURSES_START, COURSES_ERROR,
    START_SUBSCRIBING, SUBSCRIPTION_SUCCESSFULL,
    SUBSCRIBE_ERROR,
    START_FETCHING_SINGLE_COURSE,
    FETCH_SINGLE_COURSE_SUCCESS,
    FETCH_SINGLE_COURSE_ERROR,
    UPDATE_COURSE_START,
    UPDATE_COURSE_SUCCESS,
    UPDATE_COURSE_ERROR,
    ADD_COURSE_START,
    ADD_COURSE_ERROR,
    DELETE_COURSE_START,
    DELETE_COURSE_SUCCESS,
    DELETE_COURSE_ERROR,
    START_COURSES_SEARCH_FETCHING,
    FETCH_COURSES_SEARCH_SUCCESS,
    FETCH_COURSES_SEARCH_FAIL,
    UPDATE_IMAGE
} from "../actions/Courses/coursesTypes";

const initialState = {
    courses: [],
    loading: false,
    error: null,
    totalPages: [],
    currentPage: null,
    course: null,
    successMsg: null,
    image: ''
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case COURSES_START:
            return {
                ...state,
                loading: action.loading,
                error: null,
                successMsg: null
            }
        case COURSES_SUCCESS:
            return {
                ...state,
                courses: action.courses,
                totalPages: action.totalPages,
                currentPage: action.currentPage,
                loading: action.loading,
                error: null,
                successMsg: action.success
            }
        case COURSES_ERROR:
            return {
                ...state,
                error: action.error,
                loading: action.loading,
                successMsg: null
            }
        case START_SUBSCRIBING:
            return {
                ...state,
                loading: action.loading,
                error: null,
                successMsg: null
            }
        case SUBSCRIBE_ERROR:
            return {
                ...state,
                loading: action.loading,
                error: action.error,
                successMsg: null
            }
        case SUBSCRIPTION_SUCCESSFULL:
            return {
                ...state,
                loading: action.loading,
                error: null,
                successMsg: action.success
            }
        case START_FETCHING_SINGLE_COURSE:
            return {
                ...state,
                loading: action.loading,
                course: action.course,
                successMsg: null,
                error: null
            }
        case FETCH_SINGLE_COURSE_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                course: action.course,
                error: null,
                successMsg: action.success
            }
        case FETCH_SINGLE_COURSE_ERROR:
            return {
                ...state,
                loading: action.loading,
                error: action.error,
                successMsg: null
            }
        case UPDATE_COURSE_START:
            return {
                ...state,
                loading: action.loading
            }
        case UPDATE_COURSE_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                error: null,
                successMsg: action.success
            }
        case UPDATE_COURSE_ERROR:
            return {
                ...state,
                loading: action.loading,
                error: action.error,
                successMsg: null
            }
        case DELETE_COURSE_START:
            return {
                ...state,
                loading: action.loading
            }
        case DELETE_COURSE_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                error: null,
                successMsg: action.success
            }
        case DELETE_COURSE_ERROR:
            return {
                ...state,
                loading: action.loading,
                error: action.error,
                successMsg: null
            }
        case ADD_COURSE_START:
            return {
                ...state,
                loading: action.loading
            }
        case ADD_COURSE_ERROR:
            return {
                ...state,
                loading: action.loading,
                error: action.error,
                successMsg: null
            }
        case UPDATE_IMAGE:
            return {
                ...state,
                image: action.image
            }
        case START_COURSES_SEARCH_FETCHING:
            return {
                ...state,
                loading: action.loading,
                error: null,
                successMsg: null
            }
        case FETCH_COURSES_SEARCH_SUCCESS:
            return {
                ...state,
                courses: action.courses,
                totalPages: action.totalPages,
                currentPage: action.currentPage,
                loading: action.loading,
                error: null,
                successMsg: action.success
            }
        case FETCH_COURSES_SEARCH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: action.loading,
                successMsg: null
            }
        default:
            return state;
    }
}