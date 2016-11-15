import React from 'react';

export default class NumInput extends React.Component
{
    render()
    {
        return(
            <input type="number" min="0" max="300" id="lengthInput" className="textInput numInput" onChange={this.props.onChange} />
        );
    }
}
