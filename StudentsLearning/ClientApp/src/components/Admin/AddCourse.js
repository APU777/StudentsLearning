import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Button, Grid } from 'semantic-ui-react';
import InputFileReader from '../UI/FileReader/InputFileReader';
import { addCourse, updateImage } from '../../store/actions/Courses/coursesActions';

const createControl = (config, validation) => {
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: ''
    }
}

const createFormControls = () => {
    return {
        courseName: createControl({
            label: 'Course name',
            type: 'text',
            errorMessage: 'Field could not be empty'
        }, { required: true }),
        description: createControl({
            label: 'Description',
            type: 'text',
            errorMessage: 'Field could not be empty'
        }, { required: true }),
    }
}

const validateForm = (formControls) => {
    let isFormValid = true;

    for (let control in formControls) {
        if (formControls.hasOwnProperty(control)) {
            isFormValid = formControls[control].valid && isFormValid;
        }
    }
    return isFormValid;
}

class AddCourse extends Component {
    state = {
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUoAAACqBAMAAAA5NBsAAAAAHlBMVEX///+5ubnKysrT09PFxcXb29v4+Pjm5ubx8fG/v79jhCz7AAACiUlEQVR42u3bS2sTURjG8ZfUmZztkws2u7TCAXcGsXRpRFx3pN52gxa1u4qXxl0UN1mOC/XjGuPMScZDWnKwJ+/Q5/cJ/jxvAiHJCBEREREREREREREREZFe5v3+pm5NJLJ0hAAHEtc3hOhNJSZTIMgviekEYXq5RJQh0JHEkxYI9EPiaf853pNNHQO4KfG0g1ZJi7iVOwCGsrE9oCvrsZKVrFRZ+XaSq680x8D3p8or0xeYGxzprvyKhW6uudJ97BhqrnyFUl9z5TtUpnor0zEqQ72VbTi7eit34PT1Vt6A0xXPa32VHflXup/rqDy9qPIlrI7Kiy6e7qGTq6hswen7UwJWRWUCZ9efEvMxNVSaApVH/pRzVkOlZKic+VMuxtRQeYJSx59ywWqoNO7g/pTlmAoq5UMZM/WmLFkNlebvaAf+lG5MBZXSvg0MDsWb0rEaKiX9+OyT+FOujKmh8tKfBqzOSlMA3phbqrwv68xQZzVWuim9MSNXtvxKf8olq2/LasramOoqZ/BZJRfPa1P6Y6rYMrG1KT1WRWXWyWtT+mMquHgC2NqUHqtgy6xcy03p6Wy/MnFrzbBOvvWLZ9VLz4w1Vda3TNxLbwa9lVn1PjaFqsraxROU7AyqKmtbZij1xnorEyzpqly9eKa2cmXLBE2ozPRWLi+eQG/lcsusCZUJFFe6i2eaK6stEzSh8ovqylYjKpuxZTMqefHrVsmLX7fKZl38zfnlJgvn2/8GRun/L1uNqGzGls2o5MX/nyTogSJTxH/aY3B3E/e28EyKQROe75ERAt2RiE4RZpBLRO0CQX5KVJ/DpjyTqMwIAQ4lMvP44aYePBciIiIiIiIiIiIiIrpyvwGPXU9VynS3IQAAAABJRU5ErkJggg==',
        isFormValid: false,
        formControls: createFormControls(this.props.courseName, this.props.description),
        submitted: false
    }

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Form.Input
                    key={controlName + index}
                    label={control.label}
                    type={control.type}
                    onChange={event => this.onChangeHandler(event, controlName)}
                    error={!this.state.formControls[controlName].valid
                        && this.state.formControls[controlName].touched ? this.state.formControls[controlName].errorMessage : null}
                />
            );
        });
    }

    addHandler = e => {
        e.preventDefault();
        const { courseName, description } = this.state.formControls;
        const courseData = {
            courseName: courseName.value,
            description: description.value,
            imageUrl: this.props.image
        }
        this.props.addNewCourse(courseData);
        this.setState({ submitted: true });
    }

    isInArray = (array, word) => {
        return array.indexOf(word.toLowerCase()) > -1;
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };
        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);
        formControls[controlName] = control;
        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        });
    }

    validateControl(value, validation) {
        if (!validation) {
            return true;
        }
        let isValid = true;
        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }
        return isValid;
    }

    handleSrc = (srcValue) => {
        console.log(srcValue);
        this.props.updateImage(srcValue);
    }

    render() {
        let redirect = null;
        if (this.state.submitted) {
            redirect = <Redirect to='/' />;
        }

        return (
            <Grid>
                {redirect}
                <Grid.Row centered>
                    <Grid.Column width={10}>
                        <Form>
                            {this.renderInputs()}
                            <InputFileReader dataImage={this.state.image} onChangeImage={this.handleSrc}></InputFileReader>
                            <Grid>
                                <Grid.Row centered>
                                    <Grid.Column stretched>
                                        <Button secondary style={{ width:'fit-content', margin:'0 auto', marginTop:'1em' }} disabled={!this.state.isFormValid} onClick={this.addHandler}>Add</Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.courses.loading,
        isAuth: state.auth.token !== null,
        success: state.courses.successMsg,
        image: state.courses.image
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewCourse: (courseData) => dispatch(addCourse(courseData)),
        updateImage: (image) => dispatch(updateImage(image))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCourse);