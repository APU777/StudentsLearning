import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Button, Grid } from 'semantic-ui-react';

class InputFileReader extends Component{
    constructor(props){
        super();
        this.state = {
            src: props.dataImage,
            value: ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.inputFileChanged = this.inputFileChanged.bind(this);
    };
    handleClick(){
        let input = this.refs.input_reader;
        input.click();
    };
    changeImage(){
        this.props.onChangeImage(this.state.src);
    };
    inputFileChanged(e){
        if(window.FileReader){
            let file = e.target.files[0], reader = new FileReader(), self = this;
            reader.onload = function(r){
                self.setState({
                    src: r.target.result
                });
            }
            reader.readAsDataURL(file);
            self.setState({
                value:reader
            });
        }
        else {
            alert('Soryy, your browser does\'nt support for preview');
        }
    }
    render(){
        const { accept, capture, multiple } = this.props, { src, value } = this.state;
        return(
            <Grid.Column floated='right' width={6}>
                <Grid.Row>
                    <Image style={{margin:"0 auto"}} onChange={this.changeImage()} bordered rounded size='large' src={src}/>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Button
                            style={{margin: '5% auto', width: 'fit-content'}}
                            content={'Change image'}
                            secondary
                            onClick={this.handleClick}/>
                        <input type="file" ref="input_reader" accept={Array.isArray(accept) ? accept.join(',') : accept} multiple={multiple} capture={capture} style={{display:'none'}} onChange={this.inputFileChanged}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid.Column>
        );
    }
}
InputFileReader.defaultProps = {
    accept: 'image/*',
    capture: true,
    multiple: false
}
InputFileReader.propTypes = {
    accept: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    capture: PropTypes.bool,
    multiple: PropTypes.bool
}
export default InputFileReader;