import React from 'react';

export default class Input extends React.Component
{
    render()
    {
        console.log(this.props.value);
        
        return(
            <div>
                <input type="text" value={this.props.value} className="textInput mobile-font-size" id="mobTagInput" onChange={this.props.onChange} />
                <p className="small-text shade-text">Separate tags with commas or spaces</p>
            </div>
        );
    }
}
