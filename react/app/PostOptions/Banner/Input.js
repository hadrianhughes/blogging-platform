import React from 'react';

export default class Input extends React.Component
{
    render()
    {
        return(
            <input type="text" className="textInput" onChange={this.props.onChange} />
        );
    }
}
