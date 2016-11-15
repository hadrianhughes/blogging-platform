import React from 'react';

import PostOptions from './PostOptions/PostOptions';
import Editor from './Editor/Editor';

export default class Write extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { banner: '', tags: [], commentsAllowed: true, profanityAllowed: false, limited: false, limit: 0 };
    }
    
    render()
    {
        return(
            <div>
                <table id="layout-table">
                    <tbody>
                        <tr>
                            <td id="options-window">
                                <div id="postOptionsApp">
                                    <PostOptions />
                                </div>
                                
                                <div className="footer">
                                    <button className="button" onClick={this.props.onPageChange}>Back to homepage</button>
                                </div>
                            </td>
                            <td id="main-window">
                                <div id="editorApp">
                                    <Editor />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <div id="test">
                </div>
            </div>
        );
    }
}
