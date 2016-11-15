import React from 'react';

export default class Button extends React.Component
{
    render()
    {
        return(
            <button id={this.props.id} className="button" onClick={this.props.onClick}>Publish</button>
        );
    }
}
