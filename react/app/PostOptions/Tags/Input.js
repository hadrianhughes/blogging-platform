import React from 'react';

export default class Input extends React.Component
{
    render()
    {
        return(
            <input type="text" value={this.props.value} className="textInput" onChange={this.props.onChange} />
        );
    }
}
