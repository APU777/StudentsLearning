import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Card, Grid, Button } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledCard = styled.div`
    margin: 0 1em 2em 1em;
    border-radius: 5px;
    margin-bottom: 2em;
    background: #313438;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const StyledCardContent = styled.div`
    padding: 1.5em;
`;

const StyledDescription = styled.div`
    margin: 0 0 2em 0;
    color: #fff;
`;

const StyledButton = styled(Button)`
    width: 100%;
    background-color: #70c7be;
    border-radius: 4px;
    border: 0;
    color: #ffffff !important;
    cursor: pointer;
    display: inline-block;
    font-weight: 400;
    height: 2.85em;
    line-height: 2.95em;
    padding: 0 1.5em;
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
`;

const StyledImage = styled.img`
    border-radius: 4px 4px 0 0;
    width: 100%;
`;

const courseCard = props => {
    return (
        <Grid.Column width={6} style={{ paddingBottom: '3em', paddingTop: '5em' }}>
            <StyledCard>
                <StyledImage src={props.imageUrl} wrapped ui={false} />
                <StyledCardContent textAlign='center'>
                    <Card.Header as='h1' style={{ color: '#fff' }} textAlign='center'>
                        {props.header}
                    </Card.Header>
                    <StyledDescription>
                        {props.desc}
                    </StyledDescription>
                    {
                        props.match.path !== '/profile/my-courses' ? null :
                            <div style={{ marginBottom: '10px', color: '#fff' }}>
                                {props.date}
                            </div>
                    }
                </StyledCardContent>
                <div style={{ padding: '1.5em' }}>
                    <NavLink to={'/course/' + props.courseId}>
                        {
                            props.isAuth && props.userRole === 'admin' ?
                            <StyledButton secondary>Edit</StyledButton> :
                            <StyledButton secondary>Watch</StyledButton>
                        }
                    </NavLink>
                </div>
            </StyledCard>
        </Grid.Column>
    );
}

export default withRouter(courseCard);