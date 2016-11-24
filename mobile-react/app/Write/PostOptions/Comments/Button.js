import React from 'react';

export default class Button extends React.Component
{
    render()
    {
        let classes;
        if(this.props.active)
        {
            classes = "option-button mobile-font-size btnActive";
        }
        else
        {
            classes = "option-button mobile-font-size btnInactive";
        }
        
        return(
            <button className={classes} onClick={this.props.onClick}>{this.props.value}</button>
        );
    }
}
