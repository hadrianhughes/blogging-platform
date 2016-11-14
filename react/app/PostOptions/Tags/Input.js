import React from 'react';

export default class Input extends React.Component
{
    render()
    {
        return(
            <div>
                <input type="text" value={this.props.value} className="textInput no-margin" onChange={this.props.onChange} />
                <p className="small-text shade-text">Separate tags with commas</p>
            </div>
        );
    }
}
