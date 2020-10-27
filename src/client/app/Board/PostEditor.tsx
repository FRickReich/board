import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
import 'react-mde/lib/styles/scss/react-mde-all.scss';

const PostEditor = () =>
{
    const [value, setValue] = React.useState('**Hello world!!!**');
    const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>('write');



    return(
        <div className="container">
            <ReactMde
                value={value}
                onChange={setValue}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={markdown =>
                    Promise.resolve(<ReactMarkdown source={markdown} />)
                }
            />
        </div>
    );
};

export { PostEditor };
