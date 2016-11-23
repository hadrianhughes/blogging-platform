import React from 'react';

import Editor from './Editor/Editor';
import PostOptions from './PostOptions/PostOptions';

export default class Write extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { banner: '' };
        
        this.handleBannerSubmit = this.handleBannerSubmit.bind(this);
    }
    
    handleBannerSubmit(url)
    {
        this.setState({ banner: url });
    }
    
    render()
    {
        return(
            <div id="mobWriteArticle">
                <Editor />
                <PostOptions banner={this.state.banner} onBannerSubmit={(url) => this.handleBannerSubmit(url)} />
            </div>
        );
    }
}
