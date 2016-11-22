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
        
        this.state = { id: '', banner: '', title: '', content: '', photo: '', bio: '', blogInfoOpen: false, blogInfoClosed: false, postListOpen: false, postListClosed: false };
        
        this.handleBlogInfoClick = this.handleBlogInfoClick.bind(this);
        this.handlePostListClick = this.handlePostListClick.bind(this);
        this.handlePostClick = this.handlePostClick.bind(this);
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
    
    handlePostClick(id)
    {
        $.get('/loadPost', { postId: id }, function(data)
        {
            console.log(data);
            this.setState({ id: data._id, banner: data.banner, title: data.title, content: data.content });
        }.bind(this));
    }
    
    render()
    {
        return(
            <div>
                <BlogInfo photo={this.state.photo} bio={this.state.bio} open={this.state.blogInfoOpen} closed={this.state.blogInfoClosed} />
                <div id="arrowDown" onClick={this.handleBlogInfoClick}></div>
                <Content banner={this.state.banner} title={this.state.title} text={this.state.content} />
                <div id="arrowUp" onClick={this.handlePostListClick}></div>
                <PostList open={this.state.postListOpen} closed={this.state.postListClosed} onClick={(id) => this.handlePostClick(id)} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
