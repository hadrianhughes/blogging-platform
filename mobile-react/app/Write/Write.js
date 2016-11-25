import React from 'react';

import Editor from './Editor/Editor';
import PostOptions from './PostOptions/PostOptions';

export default class Write extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { title: '', banner: '', tags: [], tagInputValue: '', allowComments: true, allowProfanity: false, limit: false, length: 0 };
        
        this.handleBannerSubmit = this.handleBannerSubmit.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.addKeys = this.addKeys.bind(this);
        this.toggleComments = this.toggleComments.bind(this);
        this.toggleProfanity = this.toggleProfanity.bind(this);
        this.toggleLimit = this.toggleLimit.bind(this);
        this.handleNumChange = this.handleNumChange.bind(this);
        this.handlePublish = this.handlePublish.bind(this);
    }
    
    handleBannerSubmit(url)
    {
        this.setState({ banner: url });
    }
    
    handleTagChange(e)
    {
        //Get the value of the text box
        const input = e.target.value;

        //If it isn't empty...
        //...if the last character is a comma or a space
        if(input.length - 1 > 0)
        {
            if((input[input.length - 1] == ',') || (input[input.length - 1] == ' '))
            {
                //Make a new tag with a value equal to the text box value without the last character
                let tag = {};
                tag.value = e.target.value.substring(0, e.target.value.length - 1).toLowerCase();
                //Add the new tag to the tags array
                let tagContainer = this.state.tags;
                tagContainer.push(tag);
                tagContainer = this.addKeys(tagContainer);
                //Set to state and reset tag input box
                this.setState({ tags: tagContainer, tagInputValue: '' });
            }
            else
            {
                this.setState({ tagInputValue: input });
            }
        }
        else
        {
            this.setState({ tagInputValue: input });
        }
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
    
    handlePublish(article)
    {
        //Compile all settings into an object and send it to server.
        let post = {
            title: article.title,
            content: article.text,
            banner: this.state.banner,
            tags: this.state.tags,
            allowComments: this.state.allowComments,
            allowProfanity: this.state.allowProfanity,
            limit: this.state.limit,
            length: this.state.length
        };
        
        $.get('/isLoggedIn', function(data)
        {
            if(data.loggedIn)
            {
                $.post('/post', { post: post }, function(successful)
                {
                    if(successful)
                    {
                        console.log('Succesfully submitted post.');
                    }
                    else
                    {
                        console.log('Post creation failed.');
                    }
                    
                    this.props.onChangePage();
                }.bind(this));
            }
            else
            {
                alert('You are no longer logged in.');
            }
        }.bind(this));
    }
    
    render()
    {
        return(
            <div id="mobWriteArticle">
                <Editor onPublish={this.handlePublish} />
                <PostOptions allowComments={this.state.allowComments} allowProfanity={this.state.allowProfanity} limit={this.state.limit} onToggleComments={this.toggleComments} onToggleProfanity={this.toggleProfanity} onToggleLimit={this.toggleLimit} onNumChange={this.handleNumChange} tags={this.state.tags} tagValue={this.state.tagInputValue} onChangeTag={this.handleTagChange} onDeleteTag={this.handleDeleteTag} banner={this.state.banner} onSubmitBanner={(url) => this.handleBannerSubmit(url)}  />
                <button className="button mobile-font-size" id="mobBtnBackFromWrite" onClick={this.props.onChangePage}>Back to Blog</button>
            </div>
        );
    }
}
