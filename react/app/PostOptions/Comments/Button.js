import React from 'react';

export default class Button extends React.Component
{
    render()
    {
        let classes;
        if(this.props.active)
        {
            classes = "button btnActive";
        }
        else
        {
            classes = "button btnInactive";
        }
        
        return(
            <button className="button" onClick={this.props.onClick}>{this.props.value}</button>
        );
    }
}
