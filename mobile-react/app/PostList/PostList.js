import React from 'react';

export default class PostList extends React.Component
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
            retVal = <div id="mobPostList">
            </div>;
        }
        else
        {
            retVal = <button id="btnMobPostList" className="button" onClick={this.handleClick}>Open</button>;
        }
        
        return retVal;
    }
}
