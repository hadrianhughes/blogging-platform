import React from 'react';

export default class BlogInfo extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { open: false };
        
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick()
    {
        let newVal;
        if(this.state.open)
        {
            newVal = false;
        }
        else
        {
            newVal = true;
        }
        
        this.setState({ open: newVal });
    }
    
    render()
    {
        let retVal;
        if(this.state.open)
        {
            retVal = <div id="mobBlogInfo">
                <img src={this.props.photo} id="mobPhoto" />
                <div id="mobBio">
                    {this.props.bio}
                </div>
            </div>;
        }
        else
        {
            retVal = <button id="btnMobBlogInfo" className="button" onClick={this.handleClick}>Open</button>;
        }
        
        return retVal;
    }
}
