import React from 'react';

import Button from './Button';
import OptionList from './OptionList';
import PostList from './PostList';
import CommentsBox from './CommentsBox/CommentsBox';
import SearchBox from './SearchBox/Searchbox';

export default class Archive extends React.Component
{
    constructor()
    {
        super();

        this.state = { listOpen: false, currentMonth: {}, currentMonthString: '', months: [], posts: [], currentPost: {}, searchResults: [] };

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleMonthClick = this.handleMonthClick.bind(this);
        this.handlePostClick = this.handlePostClick.bind(this);
        this.handleResultClick = this.handleResultClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.sendComment = this.sendComment.bind(this);
        this.addKeys = this.addKeys.bind(this);
        this.makeMonthString = this.makeMonthString.bind(this);
        this.makeMonth = this.makeMonth.bind(this);
    }

    componentDidMount()
    {
        //Get list of months on which posts were published from server
        $.get('/getMonths', function(data)
        {
            let months = this.addKeys(data);

            this.setState({ months: months, currentMonth: months[0], currentMonthString: this.makeMonthString(months[0]) });

            $.get('/getPostList', { month: this.state.currentMonth }, function(data)
            {
                if(data.length > 0)
                {
                    let posts = this.addKeys(data);
                    this.setState({ posts: posts });
                    this.props.onReceivePosts(posts);
                }
            }.bind(this));
        }.bind(this));
    }
    
    handleButtonClick()
    {
        //Toggle listOpen variable
        let value = this.state.listOpen ? false : true;

        this.setState({ listOpen: value });
    }

    handleMonthClick(e)
    {
        this.setState({ currentMonthString: e.target.text, currentMonth: this.makeMonth(e.target.text) });

        //Get list of posts for current month from server
        $.get('/getPostList', { month: e.target.text }, function(data)
        {
            let posts = this.addKeys(data);

            this.setState({ posts: posts });
        }.bind(this));
    }

    handlePostClick(id)
    {
        //Load selected article
        for(let i = 0;i < this.state.posts.length;i++)
        {
            if(this.state.posts[i].id == id)
            {
                this.props.onPostClick(this.state.posts[i]._id);
            }
        }
    }
    
    handleResultClick(id)
    {
        //Load selected article
        for(let i = 0;i < this.state.searchResults.length;i++)
        {
            if(this.state.searchResults[i].id == id)
            {
                this.props.onPostClick(this.state.searchResults[i]._id);
            }
        }
    }

    sendComment(comment)
    {
        //Need to sanitize
        $.post('/sendComment', { id: this.props.postId, comment: comment }, function()
        {
            this.props.onSendComment();
        }.bind(this));
    }

    handleSearch(value)
    {
        //Send search query to server and get results
        $.get('/search', { query: value }, function(data)
        {
            let results = this.addKeys(data);

            this.setState({ searchResults: results, searchOpen: true });
        }.bind(this));
    }

    //For sets of items to be put into a list
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

    makeMonthString(value)
    {
        //List of all months of year
        const possibleMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        let retVal;
        if(value)
        {
            //Line up month integer value with respective index in possibleMonths
            let month = possibleMonths[value.month - 1];

            //Make string out of month and year and return it
            retVal = month + ' ' + value.year;
        }
        else
        {
            retVal = value;
        }

        return retVal;
    }
    
    makeMonth(string)
    {
        const parts = string.split(' ');
        const month = parts[0];
        const year = parts[1];
        
        let retVal = { year: year };
        
        const possibleMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        retVal.month = possibleMonths.indexOf(month) + 1;
        
        return retVal;
    }

    render()
    {
        //Make string version of months array in state
        let months = [];
        for(let i = 0;i < this.state.months.length;i++)
        {
            months[i] = {};
            months[i].value = this.makeMonthString(this.state.months[i]);
        }

        //Add keys to months array
        let monthOptions = this.addKeys(months);
        
        return(
            <div>
                <SearchBox results={this.state.searchResults} active={this.state.searchOpen} onSubmit={(value) => this.handleSearch(value)} onClickPost={(id) => this.handleResultClick(id)} />
                <div>
                    <h4>Archive</h4>
                    <Button onClick={this.handleButtonClick} month={this.state.currentMonthString} />
                    <OptionList onClick={this.handleMonthClick} items={monthOptions} active={this.state.listOpen} />
                    <PostList onClick={(id) => this.handlePostClick(id)} items={this.state.posts} />
                </div>
                <CommentsBox items={this.addKeys(this.props.comments.reverse())} charLimit={this.props.commentLength} onSendComment={(comment) => this.sendComment(comment)} />
            </div>
        );
    }
}
