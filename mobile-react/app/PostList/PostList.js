import React from 'react';

export default class PostList extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { posts: [] };
        
        this.addKeys = this.addKeys.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount()
    {
        $.get('/getAllPosts', function(data)
        {
            for(let i = 0;i < data.length;i++)
            {
                this.setState({ posts: this.addKeys(data) });
            }
        }.bind(this));
    }
    
    addKeys(set)
    {
        let counter = 0;

        //For each item in the set
        let retSet = set.map(function(item)
        {
            //Give it an id value equal to counter
            counter++;
            item.id = counter;
            return item;
        });

        return retSet;
    }
    
    handleClick(id)
    {
        for(let i = 0;i < this.state.posts.length;i++)
        {
            if(this.state.posts[i].id == id)
            {
                this.props.onClick(this.state.posts[i]._id);
            }
        }
    }
    
    render()
    {
        let postList = this.state.posts.map((post) => <li key={post.id}><a href="#" onClick={() => this.handleClick(post.id)}>{post.title}</a></li>)
        
        let retVal;
        if(this.props.open)
        {
            retVal = <div id="mobPostList" className="open"><ul>{postList}</ul></div>;
        }
        else if(this.props.closed)
        {
            retVal = <div id="mobPostList" className="closed">{postList}</div>
        }
        else
        {
            retVal = <div id="mobPostList">{postList}</div>
        }
        
        return retVal;
    }
}
