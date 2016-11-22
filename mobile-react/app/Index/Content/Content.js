import React from 'react';

export default class Content extends React.Component
{
    render()
    {
        return(
            <div>
                <div>
                    <img src={this.props.banner} id="mobBanner" />
                </div>
                <h2 id="mobTitle">{this.props.title}</h2>
                <div id="mobContent">
                    {this.props.text}
                </div>
            </div>
        );
    }
}
