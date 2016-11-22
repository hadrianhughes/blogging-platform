import React from 'react';

export default class PostList extends React.Component
{
    render()
    {
        let retVal;
        if(this.props.open)
        {
            retVal = <div id="mobPostList" className="open"></div>;
        }
        else if(this.props.closed)
        {
            retVal = <div id="mobPostList" className="closed"></div>
        }
        else
        {
            retVal = <div id="mobPostList"></div>
        }
        
        return retVal;
    }
}
