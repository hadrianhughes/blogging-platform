import React from 'react';

export default class Button extends React.Component
{
    render()
    {
        return(
            <button className="button maxWidth" onClick={this.props.onClick}>Load image</button>
        );
    }
}
