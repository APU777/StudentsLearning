import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import { Segment, Menu } from 'semantic-ui-react';

const toolbar = props => (
    <Segment
        inverted
        vertical>
        <Menu
            inverted
            pointing={true}
            size='large'>
            <NavigationItems isAuth={props.isAuth} userRole={props.userRole} />
            {
                props.isAuth ? <div style={{margin:'auto 0'}}>{!props.isConfirmed ? <span>Please confirm your email</span> : null}</div>
                    : null
            }
        </Menu>
    </Segment>
);

export default toolbar;