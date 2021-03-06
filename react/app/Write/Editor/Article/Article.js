import React from 'react';

import FormatButton from './FormatButton';
import Modal from './Modal';
import Button from './Button';

export default class Article extends React.Component
{
    constructor()
    {
        super();

        this.state = { bold: false, underline: false, italic: false, modal: 0, previousRange: {} };

        this.embolden = this.embolden.bind(this);
        this.underline = this.underline.bind(this);
        this.italicize = this.italicize.bind(this);
        this.insertImage = this.insertImage.bind(this);
        this.insertLink = this.insertLink.bind(this);
        this.handleFontSize = this.handleFontSize.bind(this);
        this.handleModalSubmit = this.handleModalSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.publish = this.publish.bind(this);
        this.moveCaret = this.moveCaret.bind(this);
    }

    componentDidMount()
    {
        this.refs.documentEdit.focus();
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
        this.setState({ modal: 1, previousRange: window.getSelection().getRangeAt(0) });
    }

    insertLink()
    {
        this.setState({ modal: 2, previousRange: window.getSelection().getRangeAt(0) });
    }

    handleFontSize()
    {

        this.setState({ modal: 3, previousRange: window.getSelection().getRangeAt(0) });
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
            case 4:
                let article = document.getElementById('documentContainer');
                
                //Remove any inline styling
                let elems = article.getElementsByTagName('*');
                for(let i = 0;i < elems.length;i++)
                {
                    elems[i].removeAttribute('style');
                }
                
                this.props.onPublish(article.innerHTML);
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
        this.setState({ modal: 4 });
    }

    moveCaret()
    {
        this.refs.documentEdit.focus(); //Move cursor to editable div
        let selection = window.getSelection(); //Selection will always have 0 range and be the start of the div
        selection.removeAllRanges(); //Failsafe in case bug causes something to highlight
        selection.addRange(this.state.previousRange); //Make a new range equal to the user's previous selection
    }

    render()
    {
        return(
            <div id="editorMain">
                <Modal type={this.state.modal} onSubmit={(object) => this.handleModalSubmit(object)} onClose={this.closeModal} />
                <h1 id="articleTitle">{this.props.title}</h1>
                <div>
                    <FormatButton text="B" onClick={this.embolden} />
                    <FormatButton text="U" onClick={this.underline} />
                    <FormatButton text="I" onClick={this.italicize} />
                    <FormatButton text="IMG" onClick={this.insertImage} />
                    <FormatButton text="Link" onClick={this.insertLink} />
                </div>
                <div ref="documentEdit" id="documentContainer" contentEditable></div>
                <Button onClick={this.publish} />
                {(this.props.errMsg.length > 0) ? <p className="red-text float-right">{this.props.errMsg}</p> : null}
            </div>
        );
    }
}
