import React from 'react';

export default class Article extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { banner: '', title: '', content: '' };
    }
    
    componentDidMount()
    {
        $.get('/loadPost', function(data)
        {
            this.setState({ banner: data.banner, title: data.title, content: data.content });
        }.bind(this));
    }
    
    render()
    {
        const parser = new DOMParser();
        let html = parser.parseFromString(this.state.content, 'text/html');
        
        return(
            <div>
                <div id="header">
                    <img src={this.state.banner} />
                </div>
                <div id="title">
                    {this.state.title}
                </div>
                <div id="article" dangerouslySetInnerHTML={{__html: this.state.content}}>
                </div>
            </div>
        );
    }
}
