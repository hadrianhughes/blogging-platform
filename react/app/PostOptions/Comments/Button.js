import React from 'react';

export default class Button extends React.Component
{
    render()
    {
        let classes;
        if(this.props.active)
        {
            classes = "option-button btnActive";
        }
        else
        {
            classes = "option-button btnInactive";
        }
        
        return(
            <button className={classes} onClick={this.props.onClick}>{this.props.value}</button>
        );
    }
}
