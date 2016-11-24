import React from 'react';

export default class Title extends React.Component
{
    render()
    {
        return(
            <div className="center-text">
                <h1 id="mobTitleLabel">Title: </h1>
                <input type="text" className="textInput mobile-font-size" id="mobTitleInput" onChange={this.props.onChange} />
            </div>
        );
    }
}
