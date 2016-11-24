import React from 'react';

export default class FormatButton extends React.Component
{
    render()
    {
        return <button className="btnFormat margin-top mobile-font-size" onClick={this.props.onClick}>{this.props.text}</button>;
    }
}
