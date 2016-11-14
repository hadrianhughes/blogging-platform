import React from 'react';

import Button from './Button';

export default class Article extends React.Component
{
    constructor()
    {
        super();
        
        this.embolden = this.embolden.bind(this);
        this.underline = this.underline.bind(this);
        this.italicize = this.italicize.bind(this);
    }
    
    embolden()
    {
        //Element is the editable div
        var element = document.getElementById('documentContainer');
        
        //Selection is everything selected onscreen
        var selection = window.getSelection();
        //Range is the first highlighted portion
        var range = selection.getRangeAt(0);
        console.log(range);
        //Text is the highlighted text to be emboldened
        var text = element.innerHTML.substring(range.startOffset, range.endOffset);
        
        //Node is the new bold tags
        var node = document.createElement("b");
        range.surroundContents(node);
        node.innerHTML = text;
    }
    
    underline()
    {
        
    }
    
    italicize()
    {
        
    }
    
    render()
    {
        return(
            <div id="editorMain">
                <h1 id="articleTitle">{this.props.title}</h1>
                <div>
                    <Button text="B" onClick={this.embolden} />
                    <Button text="U" />
                    <Button text="I" />
                </div>
                <div id="documentContainer" contentEditable></div>
            </div>
        );
    }
}
