import React from 'react';

import FormatButton from './FormatButton';
import Modal from './Modal';
import Button from './Button';

export default class Article extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { bold: false, underline: false, italic: false, modal: 0 };
        
        this.embolden = this.embolden.bind(this);
        this.underline = this.underline.bind(this);
        this.italicize = this.italicize.bind(this);
        this.insertImage = this.insertImage.bind(this);
        this.insertLink = this.insertLink.bind(this);
        this.handleModalSubmit = this.handleModalSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.publish = this.publish.bind(this);
    }
    
    embolden()
    {
        document.execCommand('bold', false, null);
        
        let newVal = this.state.bold ? false : true;
        this.setState({ bold: newVal });
    }
    
    underline()
    {
        document.execCommand('underline', false, null);
        
        let newVal = this.state.underline ? false : true;
        this.setState({ underline: newVal });
    }
    
    italicize()
    {
        document.execCommand('italic', false, null);
        
        let newVal = this.state.italic ? false : true;
        this.setState({ italic: newVal });
    }
    
    insertImage()
    {
        this.setState({ modal: 1 });
    }
    
    insertLink()
    {
        this.setState({ modal: 2 });
    }
    
    handleModalSubmit(object)
    {
        switch(object.type)
        {
            case 1:
                this.refs.documentEdit.focus();
                document.execCommand('insertImage', false, object.value);
                this.setState({ modal: 0 });
                break;
            case 2:
                this.refs.documentEdit.focus();
                document.execCommand('createLink', false, object.value);
                this.setState({ modal: 0 });
                break;
            default:
                console.log('Error: function handleModalSubmit should not be called by a Modal with a type of 0.');
                break;
        }
    }
    
    closeModal()
    {
        this.setState({ modal: 0 });
    }
    
    publish()
    {
        let article = document.getElementById('documentContainer');
        console.log(article.innerHTML);
    }
    
    render()
    {
        return(
            <div id="editorMain">
                <Modal type={this.state.modal} onSubmit={(object) => this.handleModalSubmit(object)} onClose={this.closeModal} />
                <h1 id="articleTitle">{this.props.title}</h1>
                <div>
                    <FormatButton text="B" active={this.state.bold} onClick={this.embolden} />
                    <FormatButton text="U" active={this.state.underline} onClick={this.underline} />
                    <FormatButton text="I" active={this.state.italic} onClick={this.italicize} />
                    <FormatButton text="IMG" onClick={this.insertImage} />
                    <FormatButton text="Link" onClick={this.insertLink} />
                </div>
                <div ref="documentEdit" id="documentContainer" contentEditable></div>
                <Button onClick={this.publish} />
            </div>
        );
    }
}
