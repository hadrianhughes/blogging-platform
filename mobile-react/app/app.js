import React from 'react';
import ReactDOM from 'react-dom';

import Content from './Content/Content';
import BlogInfo from './BlogInfo/BlogInfo';
import PostList from './PostList/PostList';

class App extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { title: '', text: '', photo: '', bio: '', blogInfoOpen: false, blogInfoClosed: false, postListOpen: false, postListClosed: false };
        
        this.handleBlogInfoClick = this.handleBlogInfoClick.bind(this);
        this.handlePostListClick = this.handlePostListClick.bind(this);
    }
    
    componentDidMount()
    {
        $.get('/getBlogInfo', function(data)
        {
            this.setState({ photo: data.photo, bio: data.bio });
        }.bind(this));
    }
    
    handleBlogInfoClick()
    {
        if(this.state.postListOpen)
        {
            this.setState({ postListOpen: false, postListClosed: true });
        }
        else
        {
            if(this.state.blogInfoOpen)
            {
                this.setState({ blogInfoOpen: false, blogInfoClosed: true });
            }
            else
            {
                this.setState({ blogInfoOpen: true, blogInfoClosed: false });
            }
        }
    }
    
    handlePostListClick()
    {
        if(this.state.blogInfoOpen)
        {
            this.setState({ blogInfoOpen: false, blogInfoClosed: true });
        }
        else
        {
            if(this.state.postListOpen)
            {
                this.setState({ postListOpen: false, postListClosed: true });
            }
            else
            {
                this.setState({ postListOpen: true, postListClosed: false });
            }
        }
    }
    
    render()
    {
        return(
            <div>
                <BlogInfo photo={this.state.photo} bio={this.state.bio} open={this.state.blogInfoOpen} closed={this.state.blogInfoClosed} />
                <div id="arrowDown" onClick={this.handleBlogInfoClick}></div>
                <Content title={this.state.title} text={this.state.text} />
                <div id="arrowUp" onClick={this.handlePostListClick}></div>
                <PostList open={this.state.postListOpen} closed={this.state.postListClosed} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
