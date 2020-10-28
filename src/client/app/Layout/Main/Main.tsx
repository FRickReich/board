import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Menu, Page } from './../index';

const Main = ({ children }) =>
{
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ errorMessage, setErrorMessage ] = useState<string>(null);
    const [ board, setBoard ] = useState<object>(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/board/info').then((response) =>
        {
            setBoard(response.data.board[0]);
            setLoading(false);

        }).catch(error =>
        {
            setErrorMessage('no board created yet.');
            setLoading(false);
        });
    }, []);

    return(
        <div>
            <>
                { !loading && <Menu title={board['title']} /> }
                <Page>
                    { children }
                </Page>
            </>
            <small>
                Link to <a href="https://github.com/FRickReich/board">code Repository</a>
                <span style={{ float: 'right' }}>© 2020 <a href="https://github.com/FRickReich/">F. Rick Reich</a></span>
            </small>
        </div>
    );
};

export { Main as Layout };
