import React from 'react';

import Title from './Title';
import Article from './Article/Article';

export default class Editor extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { title: '' };
        
        this.handleChange = this.handleChange.bind(this);
        this.handlePublish = this.handlePublish.bind(this);
    }
    
    handleChange(e)
    {
        this.setState({ title: e.target.value });
    }
    handlePublish(content)
    {
        const article = { title: title, content: content };
        this.props.onPublish(article);
    }
    
    render()
    {
        return(
            <div>
                <Title onChange={this.handleChange} />
                <br />
                <Article title={this.state.title} onPublish={(content) => this.handlePublish(content)} />
            </div>
        );
    }
}
