import React from 'react';

import PostOptions from './PostOptions/PostOptions';
import Editor from './Editor/Editor';

export default class Write extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { banner: '', tags: [], tagInputValue: '', allowComments: true, allowProfanity: false, limit: false, length: 0 };
        
        this.addKeys = this.addKeys.bind(this);
        this.toggleComments = this.toggleComments.bind(this);
        this.toggleProfanity = this.toggleProfanity.bind(this);
        this.toggleLimit = this.toggleLimit.bind(this);
        this.handleNumChange = this.handleNumChange.bind(this);
        this.handleTagInputChange = this.handleTagInputChange.bind(this);
        this.handleDeleteTag = this.handleDeleteTag.bind(this);
        this.handleSubmitBanner = this.handleSubmitBanner.bind(this);
    }
    
    addKeys(set)
    {
        let counter = 0;

        //For each item in the set
        let retSet = set.map(function(item)
        {
            //Give it an id value equal to counter
            counter++;
            item.id = counter;
            return item;
        });

        return retSet;
    }
    
    toggleComments()
    {
        let newVal = this.state.allowComments ? false : true;
        if(!newVal)
        {
            this.setState({ allowComments: newVal, allowProfanity: newVal, limit: newVal });
        }
        else
        {
            this.setState({ allowComments: newVal });
        }
    }
    
    toggleProfanity()
    {
        if(this.state.allowComments)
        {
            let newVal = this.state.allowProfanity ? false : true;
            this.setState({ allowProfanity: newVal });
        }
    }
    
    toggleLimit()
    {
        if(this.state.allowComments)
        {
            let newVal = this.state.limit ? false : true;
            this.setState({ limit: newVal });
        }
    }
    
    handleNumChange(e)
    {
        this.setState({ length: e.target.value });
    }
    
    handleTagInputChange(e)
    {
        const input = e.target.value;

        if(input)
        {
            if((input[input.length - 1] == ',') || (input[input.length - 1] == ' '))
            {
                let tag = {};
                tag.value = e.target.value.substring(0, e.target.value.length - 1);
    
                let tagContainer = this.state.tags;
                tagContainer.push(tag);
                tagContainer = this.addKeys(tagContainer);
                this.setState({ tags: tagContainer, tagInputValue: '' });
            }
            else
            {
                this.setState({ tagInputValue: input });
            }
        }
    }
    
    handleDeleteTag(id)
    {
        const idNum = id.split('-')[1];
        let tags = this.state.tags;
        
        for(let i = 0;i < tags.length;i++)
        {
            if(tags[i].id == idNum)
            {
                tags.splice(i, 1);
                break;
            }
        }
        
        this.setState({ tags: tags });
    }
    
    handleSubmitBanner(url)
    {
        this.setState({ banner: url });
    }
    
    render()
    {
        return(
            <div>
                <table id="layout-table">
                    <tbody>
                        <tr>
                            <td id="options-window">
                                <div id="postOptionsApp">
                                    <PostOptions allowComments={this.state.allowComments} allowProfanity={this.state.allowProfanity} limit={this.state.limit} onToggleComments={this.toggleComments} onToggleProfanity={this.toggleProfanity} onToggleLimit={this.toggleLimit} onNumChange={this.handleNumChange} tags={this.state.tags} tagInputValue={this.state.tagInputValue} onChangeTagInput={this.handleTagInputChange} onDeleteTag={this.handleDeleteTag} banner={this.state.banner} onSubmitBanner={(url) => this.handleSubmitBanner(url)} />
                                </div>
                                
                                <div className="footer">
                                    <button className="button" onClick={this.props.onPageChange}>Back to homepage</button>
                                </div>
                            </td>
                            <td id="main-window">
                                <div id="editorApp">
                                    <Editor />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <div id="test">
                </div>
            </div>
        );
    }
}
