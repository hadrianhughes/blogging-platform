import React from 'react';

import ImageInput from '../Global/ImageInput';
import SocialMedia from './SocialMedia/SocialMedia';
import Article from './Article/Article';
import Archive from './Archive/Archive';

export default class Index extends React.Component
{
    constructor()
    {
        super();

        this.state = { id: '', banner: '', title: '', content: '', comments: [], isModal: false, modalContents: '', bio: '', photo: '', commentLength: 100, loggedIn: false };

        this.handlePhotoClick = this.handlePhotoClick.bind(this);
        this.handleImageSubmit = this.handleImageSubmit.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.getBlogInfo = this.getBlogInfo.bind(this);
        this.getComments = this.getComments.bind(this);
        this.updateBio = this.updateBio.bind(this);
        this.handleReceivedPosts = this.handleReceivedPosts.bind(this);
        this.loadPost = this.loadPost.bind(this);
    }

    componentDidMount()
    {
        $.get('/isLoggedIn', function(data)
        {
            if(data.loggedIn)
            {
                this.setState({ loggedIn: true });
            }
        }.bind(this));
        
        this.getBlogInfo();
    }

    handlePhotoClick(loggedIn)
    {
        if(loggedIn)
        {
            this.setState({ isModal: true, modalContents: <div><h3>Change photo</h3><ImageInput onSubmit={(url) => this.handleImageSubmit(url)} isClosable={true} onClose={this.closeModal} /></div> });
        }
    }

    handleImageSubmit(url)
    {
        //Send URL to server as new blog photo
        $.get('/isLoggedIn', function(data)
        {
            if(data.loggedIn)
            {
                $.post('/updatePhoto', { photo: url }, function()
                {
                    this.getBlogInfo();
                    this.setState({ isModal: false });
                }.bind(this));
            }
            else
            {
                this.setState({ loggedIn: false });
            }
        }.bind(this));
    }

    handleBioChange(e)
    {
        if(e.target.value.length <= 300)
        {
            this.setState({ bio: e.target.value });
        }
    }

    closeModal()
    {
        this.setState({ isModal: false });
    }
    
    getBlogInfo()
    {
        $.get('/getBlogInfo', function(data)
        {
            this.setState({ bio: data.bio, photo: data.photo });
        }.bind(this));
    }
    
    getComments()
    {
        $.get('/getComments', { id: this.state.id }, function(data)
        {
            this.setState({ comments: data });
        }.bind(this));
    }
    
    updateBio()
    {
        $.get('/isLoggedIn', function(data)
        {
            if(data.loggedIn)
            {
                $.post('/updateBio', { bio: this.state.bio }, function()
                {
                    this.getBlogInfo();
                }.bind(this));
            }
            else
            {
                this.setState({ loggedIn: false });
            }
        }.bind(this));
    }
    
    handleReceivedPosts(posts)
    {
        this.loadPost(posts[0]._id);
    }
    
    loadPost(postId)
    {
        $.get('/loadPost', { postId: postId }, function(data)
        {
            this.setState({ id: data._id, banner: data.banner, title: data.title, content: data.content, comments: data.comments, commentLength: data.length });
            
        }.bind(this));
    }

    render()
    {
        return(
            <div className="hideOverflow">
                {this.state.isModal ? <div id="modal">{this.state.modalContents}</div> : null}
                <table id="layout-table">
                    <tbody>
                        <tr id="body">
                            <td className="content-to-top" id="social-media-container">
                                <div id="social-media">
                                    <SocialMedia loggedIn={this.state.loggedIn} bio={this.state.bio} photo={this.state.photo} onPhotoClick={(loggedIn) => this.handlePhotoClick(loggedIn)} onBioChange={this.handleBioChange} updateBio={this.updateBio} updateBlog={this.getBlogInfo} />
                                </div>
                            </td>
                            <td className="content-to-top" id="content-container">
                                <Article banner={this.state.banner} title={this.state.title} content={this.state.content} />
                            </td>
                            <td className="content-to-top center-text smaller-padding" id="archive-container">
                                <div id="archive">
                                    <Archive postId={this.state.id} commentLength={this.state.commentLength} onReceivePosts={(posts) => this.handleReceivedPosts(posts)} comments={this.state.comments} onSendComment={this.getComments} onPostClick={(postId) => this.loadPost(postId)} />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="footer">
                    <a href="#" onClick={this.props.changeToBlogCreation} className="float-right">Login/Sign up</a>
                    <a href="#" className="float-right">[BRAND NAME]</a>
                    {this.state.loggedIn ? <a href="#" onClick={this.props.changeToWrite} className="float-left">Write an article</a> : null}
                </div>
            </div>
        );
    }
}
