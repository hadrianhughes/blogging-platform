import React from 'react';

export default class FormatButton extends React.Component
{
    render()
    {
        return(
            <button className="btnFormat" onClick={this.props.onClick}>{this.props.text}</button>
        );
    }
}
