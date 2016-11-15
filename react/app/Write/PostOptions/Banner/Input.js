import React from 'react';

export default class Input extends React.Component
{
    render()
    {
        return(
            <input type="text" placeholder="URL of image..." className="textInput" onChange={this.props.onChange} />
        );
    }
}
