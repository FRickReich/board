import React, { useState, useEffect } from 'react';
import ReactMde, { Command } from 'react-mde';
import ReactMarkdown from 'react-markdown';
import 'react-mde/lib/styles/scss/react-mde-all.scss';
import { getUser } from '../../../../Utils/Common';

const PostEditor = () =>
{
    const [ user, setUser ] = useState<any>(null);
    const [value, setValue] = React.useState('**Hello world!!!**');
    const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>('write');

    useEffect(() => {
        setUser(getUser());
    }, []);

    const stickyCommand = {
        name: "stick",
        icon: () => (
            <span role="img" aria-label="nice" style={{ lineHeight: 0 }}>★</span>
        ),
        execute: opts => {
            opts.textApi.replaceSelection("Sticky-Post");
        }
    };

    const adminToolbar = [
        ['header', 'bold', 'italic', 'strikethrough'],
        ['link', 'quote', 'code', 'image'],
        ['unordered-list', 'ordered-list', 'checked-list'],
        ['stickyPost']
    ];

    const moderatorToolbar = [
        ['header', 'bold', 'italic', 'strikethrough'],
        ['link', 'quote', 'code', 'image'],
        ['unordered-list', 'ordered-list', 'checked-list'],
        ['stickyPost']
    ];

    const memberToolbar = [
        ['header', 'bold', 'italic', 'strikethrough'],
        ['link', 'quote', 'code', 'image'],
        ['unordered-list', 'ordered-list', 'checked-list']
    ];

    return(
        <div className="PostEditor">
            {
                user ? (
                    <>
                        <ReactMde
                            commands={{
                                "stickyPost": stickyCommand
                            }}
                            toolbarCommands={user.role === 'admin' ? adminToolbar : user.role === 'moderator' ? moderatorToolbar : memberToolbar}
                            value={value}
                            onChange={setValue}
                            selectedTab={selectedTab}
                            onTabChange={setSelectedTab}
                            generateMarkdownPreview={
                                markdown => Promise.resolve(<ReactMarkdown source={markdown} />)
                            }
                        />
                    </>
                ) : (
                    <>
                        <p>You are not logged in!</p>
                    </>
                )
            }
        </div>
    );
};

export { PostEditor };
