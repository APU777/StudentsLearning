﻿import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCourses, fetchCoursesSearch, subscribeToCourse } from '../../store/actions/Courses/coursesActions';
import CourseCard from '../../components/Courses/CourseCard/CourseCard';
import { Grid, Container, Input, Button } from 'semantic-ui-react';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/UI/Loader/Loader';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const StyledInput = styled(Input)`
    margin-left: 35%;
    margin-top: 50px;
`;

class Courses extends Component {
    state = {
        search: '',
        isSortAscendingCourses: false,
        sortBy: ''
    }

    componentDidMount() {
        this.props.fetchCourses();
    }

    inputHandler = () => {
        this.props.fetchCoursesSearch(this.state.sortBy, this.state.isSortAscendingCourses, this.state.search, this.props.currentPage);
        this.setState({ search: ''});
    }
    
    handleInputChange = e => {
        this.setState({ search: e.target.value });
    }

    resetSearch = () => {
        this.setState({ search: ''});
        this.props.fetchCoursesSearch(this.state.sortBy, this.state.isSortAscendingCourses, this.state.search, this.props.currentPage);
    }

    render() {
        return (
            <React.Fragment>
                <Container>
                    {this.props.isAuth && this.props.userRole === 'student' ?
                        <Container>
                            <StyledInput
                                value={this.state.search}
                                action={{ icon: 'search', onClick: () => this.inputHandler() }}
                                onChange={this.handleInputChange}
                                placeholder='Search...'
                            />
                            <Button style={{margin:'0 3%'}} onClick={this.resetSearch}>Reset</Button>
                        </Container> : null
                    }
                    { Array.from(this.props.coursesList).length !== 0 ?
                        <Grid stretched columns={2}>
                            <Grid.Row centered>
                                {this.props.loading ? <Loader /> :
                                    this.props.coursesList.map((val, index) => {
                                        return (
                                            <CourseCard
                                                key={index}
                                                imageUrl={val.imageUrl}
                                                header={val.name}
                                                desc={this.props.coursesList[index].description}
                                                subscribe={this.props.subscribe}
                                                courseId={this.props.coursesList[index].id}
                                                confirmed={this.props.emailConfirmed}
                                                isAuth={this.props.isAuth}
                                                userRole={this.props.userRole}
                                            />
                                        );
                                    })
                                }
                            </Grid.Row>
                        </Grid> 
                        : <h1 style={{margin:'10% 30%', width: 'inherit'}}>Not found course with this name</h1>
                    }
                    {this.props.loading ? null : Array.from(this.props.coursesList).length !== 0 ?
                        <Container>
                            <Grid>
                                <Grid.Row centered>
                                    <Pagination
                                        currentPage={this.props.currentPage}
                                        loadData={this.props.fetchCourses}
                                        totalPages={this.props.totalPages} />
                                </Grid.Row>
                            </Grid>
                        </Container> : null
                    }
                </Container>
                <ToastContainer enableMultiContainer containerId={'auth'} autoClose={4000} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        coursesList: state.courses.courses,
        loading: state.courses.loading,
        totalPages: state.courses.totalPages,
        currentPage: state.courses.currentPage,
        emailConfirmed: state.auth.emailConfirmed,
        isAuth: state.auth.token !== null,
        userRole: state.auth.role,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCourses: currentPage => dispatch(fetchCourses(currentPage)),
        subscribe: (Id) => dispatch(subscribeToCourse(Id)),
        fetchCoursesSearch: (orderBy, isSortAscendingCourses, search, currentPage) => dispatch(fetchCoursesSearch(orderBy, isSortAscendingCourses, search, currentPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses);