import React, { useState, useEffect } from 'react';
import PageHeader from '../Components/PageHeader';
import axios from 'axios';

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
            {
                loading ?
                (
                    <p>loading...</p>
                ): (
                    <>
                        <PageHeader title={board['title']} />
                        <hr />
                            { children }
                        <hr />
                    </>
                    )
            }
            <small>Link to <a href="https://github.com/FRickReich/board">code Repository</a></small>
        </div>
    );
};

export { Main as Layout };
