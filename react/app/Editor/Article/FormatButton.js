import React from 'react';

export default class FormatButton extends React.Component
{
    render()
    {
        let classes;
        if(this.props.active)
        {
            classes = 'btnFormat active';
        }
        else
        {
            classes = 'btnFormat';
        }
        
        return(
            <button className={classes} onClick={this.props.onClick}>{this.props.text}</button>
        );
    }
}
