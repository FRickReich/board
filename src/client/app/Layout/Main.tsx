import React, { Component } from 'react';
import PageHeader from '../Components/PageHeader';
import axios from 'axios';

type MyProps = {};
type MyState =
{
    isLoading: boolean,
    error: string,
    board: object
};

class Main extends Component<MyProps, MyState>
{
    constructor(props)
    {
        super(props);
    }

    state = {
        isLoading: true,
        error: null,
        board: null
    };

    componentDidMount()
    {
        axios.get('http://localhost:3000/api/board/info').then((response) =>
        {
            this.setState({
                isLoading: false,
                board: response.data.board[0]
            });
        }).catch(error =>
        {
            this.setState({ isLoading: false, error: 'no board created yet.hahh' });
        });
    }

    render = () =>
    {
        const { children } = this.props;
        const { isLoading, board } = this.state;

        return (
            <div>
                {
                    isLoading ? (
                        <p>loading...</p>
                    ): (
                        <>
                            <PageHeader title={board.title} />
                            <hr />
                                { children }
                            <hr />
                        </>
                    )
                }
                <small>Link to <a href="https://github.com/FRickReich/board">sourcecode Repository</a></small>
            </div>
        );
    }
}

export { Main as Layout };
