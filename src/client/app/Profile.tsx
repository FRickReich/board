import React, { Component } from 'react';
import { Layout } from './Layout';

type ComponentProps =
{
    match: any
};

type ComponentStates =
{
    
};

class Profile extends Component<ComponentProps, ComponentStates>
{
    constructor(props)
    {
        super(props);
    }

    componentDidMount = () =>
    {
        console.log(this.props.match.params);
    }

    render = () =>
    {
        const { match } = this.props;

        return(
            <Layout>Profile...{ match.params.userId }</Layout>
        );
    }
}

export { Profile };
