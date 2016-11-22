import React from 'react';

import Comments from './Comments/Comments';

export default class PostList extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { posts: [] };
        
        this.addKeys = this.addKeys.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.sendComment = this.sendComment.bind(this);
    }
    
    componentDidMount()
    {
        $.get('/getAllPosts', function(data)
        {
            for(let i = 0;i < data.length;i++)
            {
                this.setState({ posts: this.addKeys(data) });
                this.props.onClick(data[0]._id);
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
    
    sendComment(comment)
    {
        $.post('/sendComment', { id: this.props.postId, comment: comment }, function()
        {
            this.props.onSendComment();
        }.bind(this));
    }
    
    render()
    {
        let postList = this.state.posts.map((post) => <li key={post.id}><a href="#" onClick={() => this.handleClick(post.id)}>{post.title}</a></li>)
        
        let retVal;
        if(this.props.open)
        {
            retVal = <div id="mobPostList" className="open">
                        <ul>{postList}</ul>
                        <Comments items={this.addKeys(this.props.comments.reverse())} charLimit={this.props.commentLength} onSendComment={(comment) => this.sendComment(comment)} />
                        <button className="button" id="btnChangePage" onClick={this.props.onChangePage}>Write an article</button>
                    </div>;
        }
        else if(this.props.closed)
        {
            retVal = <div id="mobPostList" className="closed">
                        <ul>{postList}</ul>
                        <Comments items={this.addKeys(this.props.comments.reverse())} charLimit={this.props.commentLength} onSendComment={(comment) => this.sendComment(comment)} />
                        <button className="button">Write an article</button>
                    </div>;
        }
        else
        {
            retVal = <div id="mobPostList">
                <button className="button">Write an article</button>
                        <ul>{postList}</ul>
                        <Comments items={this.addKeys(this.props.comments.reverse())} charLimit={this.props.commentLength} onSendComment={(comment) => this.sendComment(comment)} />
                        <button className="button">Write an article</button>
                    </div>;
        }
        
        return retVal;
    }
}
