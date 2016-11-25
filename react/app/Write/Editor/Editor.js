import React from 'react';

import Title from './Title';
import Article from './Article/Article';

export default class Editor extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { title: '', errMsg: '' };
        
        this.handleChange = this.handleChange.bind(this);
        this.handlePublish = this.handlePublish.bind(this);
    }
    
    handleChange(e)
    {
        this.setState({ title: e.target.value });
    }
    
    handlePublish(content)
    {
        const article = { title: this.state.title, content: content };
        if(article.title && article.content)
        {
            this.props.onPublish(article);
        }
        else
        {
            if(!article.title && !article.content)
            {
                this.setState({ errMsg: 'You must have a title and content.' });
            }
            else if(!article.title)
            {
                this.setState({ errMsg: 'You must have a title.' });
            }
            else
            {
                this.setState({ errMsg: 'You must have content.' });
            }
        }
    }
    
    render()
    {
        return(
            <div>
                <Title onChange={this.handleChange} />
                <br />
                <Article title={this.state.title} errMsg={this.state.errMsg} onPublish={(content) => this.handlePublish(content)} />
            </div>
        );
    }
}
