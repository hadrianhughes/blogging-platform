import React from 'react';

export default class Input extends React.Component
{
    render()
    {
        
        return(
            <div>
                <input type="text" value={this.props.value} className="textInput mobile-font-size" id="mobTagInput" onChange={this.props.onChange} />
                <p className="small-text shade-text">Separate tags with commas or spaces</p>
            </div>
        );
    }
}
