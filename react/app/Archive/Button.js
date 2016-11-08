import React from 'react';

export default class Button extends React.Component
{
    render()
    {
        return(
            <button id="btnDate" onClick={this.props.onClick}>{this.props.month}</button>
        );
    }
}
