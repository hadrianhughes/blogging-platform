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

        this.state = { id: '', banner: '', title: '', content: '', comments: [], isModal: false, modalContents: '' };

        this.handlePhotoClick = this.handlePhotoClick.bind(this);
        this.handleImageSubmit = this.handleImageSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.getComments = this.getComments.bind(this);
    }

    componentDidMount()
    {
        //Get latest post from server
        $.get('/loadPost', function(data)
        {
            this.setState({ id: data._id, banner: data.banner, title: data.title, content: data.content, comments: data.comments });
        }.bind(this));
    }

    handlePhotoClick()
    {
        this.setState({ isModal: true, modalContents: <div><h3>Change photo</h3><ImageInput onSubmit={(url) => this.handleImageSubmit(url)} isClosable={true} onClose={this.closeModal} /></div> });
    }

    handleImageSubmit(url)
    {
        //Send URL to server as new blog photo
        console.log(url);
        this.setState({ isModal: false });
    }

    closeModal()
    {
        this.setState({ isModal: false });
    }
    
    getComments()
    {
        $.get('/getComments', { id: this.state.id }, function(data)
        {
            this.setState({ comments: data });
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
                                <SocialMedia onPhotoClick={this.handlePhotoClick} />
                            </td>
                            <td className="content-to-top" id="content-container">
                                <Article banner={this.state.banner} title={this.state.title} content={this.state.content} />
                            </td>
                            <td className="content-to-top center-text smaller-padding" id="archive-container">
                                <div id="archive">
                                    <Archive postId={this.state.id} comments={this.state.comments} onSendComment={this.getComments} />
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
