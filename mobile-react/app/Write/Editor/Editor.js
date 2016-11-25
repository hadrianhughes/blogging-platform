import React from 'react';

import Title from './Title';
import FormatButton from './FormatButton';
import Modal from './Modal';

export default class Editor extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { title: '', modal: 0, previousRange: {} };
        
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.embolden = this.embolden.bind(this);
        this.underline = this.underline.bind(this);
        this.italicize = this.italicize.bind(this);
        this.insertImage = this.insertImage.bind(this);
        this.insertLink = this.insertLink.bind(this);
        this.publish = this.publish.bind(this);
        this.handleModalSubmit = this.handleModalSubmit.bind(this);
        this.moveCaret = this.moveCaret.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    
    handleTitleChange(e)
    {
        this.setState({ title: e.target.value });
    }
    
    embolden()
    {
        document.execCommand('bold', false, null);
    }
    
    underline()
    {
        document.execCommand('underline', false, null);
    }
    
    italicize()
    {
        document.execCommand('italic', false, null);
    }
    
    insertImage()
    {
        this.setState({ modal: 1, previousRange: window.getSelection().getRangeAt(0) });
    }
    
    insertLink()
    {
        this.setState({ modal: 2, previousRange: window.getSelection().getRangeAt(0) });
    }
    
    publish()
    {
        let article = document.getElementById('mobDocumentContainer');
        
        //Remove any inline styling
        let elems = article.getElementsByTagName('*');
        for(let i = 0;i < elems.length;i++)
        {
            elems[i].removeAttribute('style');
        }
        
        let post = { text: article.innerHTML, title: this.state.title };
        
        if(post.text.length < 1 && post.title.length < 1)
        {
            alert('You need a title and content.');
        }
        else if(post.text.length < 1)
        {
            alert('You need content.');
        }
        else if(post.title.length < 1)
        {
            alert('You need a title.');
        }
        else
        {
            this.props.onPublish(post);
        }
    }
    
    handleModalSubmit(object)
    {
        switch(object.type)
        {
            case 1:
                this.moveCaret();
                document.execCommand('insertImage', false, object.value);
                this.setState({ modal: 0 });
                break;
            case 2:
                this.moveCaret();
                document.execCommand('createLink', false, object.value);
                this.setState({ modal: 0 });
                break;
            default:
                console.log('Error: function handleModalSubmit should not be called by a Modal with a type of 0.');
                break;
        }
    }
    
    moveCaret()
    {
        this.refs.documentEdit.focus();
        let selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(this.state.previousRange);
    }
    
    closeModal()
    {
        this.setState({ modal: 0 });
    }
    
    render()
    {
        return(
            <div className="margin-bottom">
                <Modal type={this.state.modal} onSubmit={(object) => this.handleModalSubmit(object)} onClose={this.closeModal} />
                <Title onChange={this.handleTitleChange} />
                <div>
                    <FormatButton text="B" onClick={this.embolden} />
                    <FormatButton text="U" onClick={this.underline} />
                    <FormatButton text="I" onClick={this.italicize} />
                    <FormatButton text="IMG" onClick={this.insertImage} />
                    <FormatButton text="Link" onClick={this.insertLink} />
                    <div ref="documentEdit" id="mobDocumentContainer" contentEditable></div>
                </div>
                <button className="button mobile-font-size" id="mobBtnPublish" onClick={this.publish}>Publish</button>
            </div>
        );
    }
}
