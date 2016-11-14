import React from 'react';

export default class NumInput extends React.Component
{
    render()
    {
        return(
            <input type="number" id="lengthInput" className="textInput numInput" onChange={this.props.onChange} />
        );
    }
}
