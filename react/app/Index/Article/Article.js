import React from 'react';

export default class Article extends React.Component
{
    render()
    {
        return(
            <div>
                <div id="header">
                    <img src={(this.props.banner.length > 0) ? this.props.banner : null} />
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
