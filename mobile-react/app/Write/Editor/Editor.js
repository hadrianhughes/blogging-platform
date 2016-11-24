import React from 'react';

import Title from './Title';

export default class Editor extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { title: '' };
        
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.publish = this.publish.bind(this);
    }
    
    handleTitleChange(e)
    {
        this.setState({ title: e.target.value });
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
    
    render()
    {
        return(
            <div>
                <Title onChange={this.handleTitleChange} />
                <div ref="documentEdit" id="mobDocumentContainer" contentEditable></div>
                <button className="button mobile-font-size" id="mobBtnPublish" onClick={this.publish}>Publish</button>
            </div>
        );
    }
}
