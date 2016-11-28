import React from 'react';

import Content from './Content/Content';
import BlogInfo from './BlogInfo/BlogInfo';
import PostList from './PostList/PostList';

export default class Index extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { id: '', banner: '', title: '', content: '', comments: [], commentLength: 100, photo: '', bio: '', blogInfoOpen: false, blogInfoClosed: false, postListOpen: false, postListClosed: false, loggedIn: false, isModal: false, url: '' };
        
        this.getBlogInfo = this.getBlogInfo.bind(this);
        this.handleBlogInfoClick = this.handleBlogInfoClick.bind(this);
        this.handlePostListClick = this.handlePostListClick.bind(this);
        this.handlePostClick = this.handlePostClick.bind(this);
        this.getComments = this.getComments.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
        this.updateBio = this.updateBio.bind(this);
        this.handlePhotoClick = this.handlePhotoClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleURLChange = this.handleURLChange.bind(this);
        this.handlePhotoSubmit = this.handlePhotoSubmit.bind(this);
    }
    
    componentDidMount()
    {
        $.get('/isLoggedIn', function(data)
        {
            this.setState({ loggedIn: data.loggedIn });
        }.bind(this));
        
        this.getBlogInfo();
    }
    
    getBlogInfo()
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
            this.setState({ id: data._id, banner: data.banner, title: data.title, content: data.content, comments: data.comments.reverse(), commentLength: data.length });
        }.bind(this));
    }
    
    getComments()
    {
        $.get('/getComments', { id: this.state.id }, function(data)
        {
            this.setState({ comments: data.reverse() });
        }.bind(this));
    }
    
    handleBioChange(e)
    {
        if(e.target.value.length <= 300)
        {
            this.setState({ bio: e.target.value });
        }
    }
    
    updateBio()
    {
        $.post('/updateBio', { bio: this.state.bio }, function()
        {
            this.getBlogInfo();
        }.bind(this));
    }
    
    handlePhotoClick()
    {
        this.setState({ isModal: true });
    }
    
    closeModal()
    {
        this.setState({ isModal: false });
    }
    
    handleURLChange(e)
    {
        this.setState({ url: e.target.value });
    }
    
    handlePhotoSubmit()
    {
        $.post('/updatePhoto', { photo: this.state.url }, function(data)
        {
            this.getBlogInfo();
            this.setState({ isModal: false });
        }.bind(this));
    }
    
    render()
    {
        return(
            <div>
                {this.state.isModal ? <div id="mobModal"><input type="text" placeholder="Image URL..." className="textInput mobile-font-size" onChange={this.handleURLChange} /><button className="button mobile-font-size" onClick={this.handlePhotoSubmit}>Submit</button><br /><button className="button mobile-font-size" onClick={this.closeModal}>Close</button></div> : null}
                
                <BlogInfo photo={this.state.photo} bio={this.state.bio} open={this.state.blogInfoOpen} closed={this.state.blogInfoClosed} loggedIn={this.state.loggedIn} onChangeBio={this.handleBioChange} onUpdateBio={this.updateBio} onPhotoClick={this.handlePhotoClick} />
                <div id="arrowDown" onClick={this.handleBlogInfoClick}></div>
                <Content banner={this.state.banner} title={this.state.title} text={this.state.content} />
                <div id="arrowUp" onClick={this.handlePostListClick}></div>
                <PostList postId={this.state.id} open={this.state.postListOpen} closed={this.state.postListClosed} onClick={(id) => this.handlePostClick(id)} comments={this.state.comments} commentLength={this.state.commentLength} onSendComment={this.getComments} onChangePage={this.props.onChangePage} loggedIn={this.state.loggedIn} onLogin={this.props.onLogin} backToMenu={this.props.backToMenu} />
            </div>
        );
    }
}
