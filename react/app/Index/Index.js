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

        this.state = { id: '', banner: '', title: '', content: '', comments: [], isModal: false, modalContents: '', bio: '', photo: '', loggedIn: false };

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
        //Get latest post from server
        $.get('/loadPost', function(data)
        {
            this.setState({ id: data._id, banner: data.banner, title: data.title, content: data.content, comments: data.comments });
        }.bind(this));
        
        $.get('/isLoggedIn', function(data)
        {
            if(data.loggedIn)
            {
                console.log(data.loggedIn);
                this.setState({ loggedIn: true });
            }
        }.bind(this));
        
        this.getBlogInfo();
    }

    handlePhotoClick()
    {
        this.setState({ isModal: true, modalContents: <div><h3>Change photo</h3><ImageInput onSubmit={(url) => this.handleImageSubmit(url)} isClosable={true} onClose={this.closeModal} /></div> });
    }

    handleImageSubmit(url)
    {
        //Send URL to server as new blog photo
        $.post('/updatePhoto', { photo: url }, function()
        {
            this.getBlogInfo();
            this.setState({ isModal: false });
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
        $.post('/updateBio', { bio: this.state.bio }, function()
        {
            this.getBlogInfo();
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
            this.setState({ id: data._id, banner: data.banner, title: data.title, content: data.content, comments: data.comments });
        }.bind(this));
    }

    render()
    {
        return(
            <div>
                {this.state.isModal ? <div id="modal">{this.state.modalContents}</div> : null}
                <table id="layout-table">
                    <tbody>
                        <tr id="body">
                            <td className="content-to-top" id="social-media-container">
                                <SocialMedia loggedIn={this.state.loggedIn} bio={this.state.bio} photo={this.state.photo} onPhotoClick={this.handlePhotoClick} onBioChange={this.handleBioChange} updateBio={this.updateBio} updateBlog={this.getBlogInfo} />
                            </td>
                            <td className="content-to-top" id="content-container">
                                <Article banner={this.state.banner} title={this.state.title} content={this.state.content} />
                            </td>
                            <td className="content-to-top center-text smaller-padding" id="archive-container">
                                <div id="archive">
                                    <Archive postId={this.state.id} onReceivePosts={(posts) => this.handleReceivedPosts(posts)} comments={this.state.comments} onSendComment={this.getComments} onPostClick={(postId) => this.loadPost(postId)} />
                                </div>
                                <div className="footer">
                                    <button className="button" onClick={this.props.changeToBlogCreation}>Login/Sign Up</button>
                                    <button className="button" onClick={this.props.changeToWrite}>Write an article</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
