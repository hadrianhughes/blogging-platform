import React from 'react';

export default class Photo extends React.Component
{
    render()
    {
        let imgClass = "";
        if(this.props.loggedIn)
        {
            imgClass = "logged-in";
        }
        
        return(
            <div className="larger-padding center-text" id="photo" onClick={() => this.props.onClick(this.props.loggedIn)}>
                <img className={imgClass} src={this.props.src} />
            </div>
        );
    }
}
