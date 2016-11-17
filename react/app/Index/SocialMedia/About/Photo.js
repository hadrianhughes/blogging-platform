import React from 'react';

export default class Photo extends React.Component
{
    render()
    {
        //src for img should ultimately be gotten from server
        return(
            <div className="larger-padding center-text" id="photo" onClick={this.props.onClick}>
                <img className="logged-in" src={this.props.src} />
            </div>
        );
    }
}
