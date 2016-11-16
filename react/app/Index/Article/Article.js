import React from 'react';

export default class Article extends React.Component
{
    render()
    {
        const parser = new DOMParser();
        let html = parser.parseFromString(this.props.content, 'text/html');
        
        return(
            <div>
                <div id="header">
                    <img src={this.props.banner} />
                </div>
                <div id="title">
                    {this.props.title}
                </div>
                <div id="article" dangerouslySetInnerHTML={{__html: this.props.content}}>
                </div>
            </div>
        );
    }
}
