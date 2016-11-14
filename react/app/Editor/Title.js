import React from 'react';

export default class Title extends React.Component
{
    render()
    {
        return(
            <div>
                <h3>Title: </h3>
                <input type="text" className="textInput" onChange={this.props.onChange} />
            </div>
        );
    }
}
