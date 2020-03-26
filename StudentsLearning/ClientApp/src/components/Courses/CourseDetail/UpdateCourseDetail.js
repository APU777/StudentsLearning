import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchCourseById, deleteCourseById, updateCourse, updateImage } from '../../../store/actions/Courses/coursesActions';
import { Segment, Grid, Button, Header } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../UI/Loader/Loader';
import InputFileReader from '../../UI/FileReader/InputFileReader'

class UpdateCourseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false
        }
    }

    handleSrc = (srcValue) => {
        this.props.updateImage(srcValue);
    }

    componentDidMount() {
        this.props.fetchCourseById(this.props.match.params.id);
    }

    updateHandler = () => {
        const courseData = {
            id: this.props.match.params.id,
            courseName: document.getElementById("header").textContent,
            description: document.getElementById("description").textContent,
            imageUrl: this.props.image
        }
        this.props.updateCourseDetails(courseData);
        this.props.updateImage('');
    }

    deleteHandler = () => {
        this.props.deleteCourse(this.props.match.params.id);
        this.setState({ submitted: true });
    }

    render() {
        let redirect = null;
        if (this.state.submitted) {                
            redirect = <Redirect to='/' />;
        }
        return (
            <React.Fragment>
                {redirect}
                {this.props.course === null || this.props.loading ? <Loader /> :
                    <Segment vertical>
                        <Grid container stackable verticalAlign='middle'>
                            <Grid.Row centered>
                                <Grid.Column width={8}>
                                    <div>
                                        <Header id="header" suppressContentEditableWarning="true" contentEditable={true} textAlign='center' as='h1'>
                                            {this.props.course.courseName}
                                        </Header>
                                        <p suppressContentEditableWarning="true" contentEditable={true} id="description" style={{ fontSize: '1.33em' }}>
                                            {this.props.course.description}
                                        </p>
                                    </div>
                                </Grid.Column>
                                <InputFileReader dataImage={this.props.course.imageUrl} onChangeImage={this.handleSrc}></InputFileReader>
                            </Grid.Row>
                            <Grid.Row textAlign='justified'>
                                <Grid.Column md={4}>
                                    <Button
                                        content="Save"
                                        secondary
                                        onClick={() => {
                                            this.updateHandler()
                                        }}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Button
                                        content="Delete"
                                        secondary
                                        onClick={() => {
                                            this.deleteHandler()
                                        }}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                }
                <ToastContainer enableMultiContainer containerId={'subscription'} autoClose={4000} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        course: state.courses.course,
        loading: state.courses.loading,
        isAuth: state.auth.token !== null,
        confirmed: state.auth.emailConfirmed,
        userRole: state.auth.role,
        error: state.courses.error,
        success: state.courses.successMsg,
        image: state.courses.image
    }
}

const mapDispatchToProps = dispatch => {
    return {        
        fetchCourseById: id => dispatch(fetchCourseById(id)),
        updateCourseDetails: (courseData) => dispatch(updateCourse(courseData)),
        deleteCourse: (id) => dispatch(deleteCourseById(id)),
        updateImage: (image) => dispatch(updateImage(image))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCourseDetail);