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
        this.handlePublish = this.handlePublish.bind(this);
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
        //newVal is equal to the opposite of allowComments in state
        let newVal = this.state.allowComments ? false : true;

        //If newVal is false
        if(!newVal)
        {
            //Make all other comment settings default to false
            this.setState({ allowComments: newVal, allowProfanity: newVal, limit: newVal });
        }
        else
        {
            this.setState({ allowComments: newVal });
        }
    }

    //If comments are allowed, toggle the profanity setting
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

    //When the value of the tag text box changes
    handleTagInputChange(e)
    {
        //Get the value of the text box
        const input = e.target.value;

        //If it isn't empty...
            //...if the last character is a comma or a space
        //if(input.length - 1 > 0)
        if((input.length - 1 >= 3) && (!input.includes(' ')))
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

    handleDeleteTag(id)
    {
        //Split the id string into 2 string ('tag' & an integer) and get the integer
        const idNum = id.split('-')[1];
        let tags = this.state.tags;

        //For each tag in the array
        for(let i = 0;i < tags.length;i++)
        {
            //If the tag's id value is equal to the passed integer
            if(tags[i].id == idNum)
            {
                //Remove that tag
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

    handlePublish(article)
    {
        let tagString = '';
        for(let i = 0;i < this.state.tags.length;i++)
        {
            tagString += this.state.tags[i].value;
            if(i < this.state.tags.length - 1)
            {
                tagString += ', ';
            }
        }
        
        //Compile all post information into JSON object
        let post = {
            title: article.title,
            content: article.content + '<br><div><i>' + tagString + '</i></div>',
            banner: this.state.banner,
            tags: this.state.tags,
            allowComments: this.state.allowComments,
            allowProfanity: this.state.allowProfanity,
            limit: this.state.limit,
            length: this.state.length
        };

        //Send object to server for adding to DB
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
                    
                    this.props.onPageChange();
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
            <div>
                <table id="layout-table">
                    <tbody>
                        <tr>
                            <td id="options-window">
                                <div id="postOptionsApp">
                                    <PostOptions allowComments={this.state.allowComments} allowProfanity={this.state.allowProfanity} limit={this.state.limit} onToggleComments={this.toggleComments} onToggleProfanity={this.toggleProfanity} onToggleLimit={this.toggleLimit} onNumChange={this.handleNumChange} tags={this.state.tags} tagInputValue={this.state.tagInputValue} onChangeTagInput={this.handleTagInputChange} onDeleteTag={this.handleDeleteTag} banner={this.state.banner} onSubmitBanner={(url) => this.handleSubmitBanner(url)} />
                                </div>
                            </td>
                            <td id="main-window">
                                <div id="editorApp">
                                    <Editor onPublish={(article) => this.handlePublish(article)} />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="footer">
                    <a href="#" onClick={this.props.onPageChange}>Back to homepage</a>
                </div>

                <div id="test">
                </div>
            </div>
        );
    }
}
