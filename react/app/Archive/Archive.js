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

        this.state = { listOpen: false, currentMonth: '', months: [], posts: [], comments: [{ id: 1, author: 'Joe Bloggs', comment: 'Hello world' }, { id: 2, author: 'Jane Doe', comment: 'Lorem ipsum' }, { id: 3, author: 'John Smith', comment: 'Blah blah' }], searchResults: [] };

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleMonthClick = this.handleMonthClick.bind(this);
        this.handlePostClick = this.handlePostClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.sendComment = this.sendComment.bind(this);
        this.addKeys = this.addKeys.bind(this);
        this.makeMonth = this.makeMonth.bind(this);
    }

    componentDidMount()
    {
        //Get month list from server
        $.get('/getMonths', function(data)
        {
            let months = this.addKeys(data);
            
            this.setState({ months: months, currentMonth: this.makeMonth(months[0]) });
        }.bind(this));

        //Get post list from server based on current month
        $.get('/getPostList', { month: this.state.currentMonth }, function(data)
        {
            let posts = this.addKeys(data);

            this.setState({ posts: posts });
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
        this.setState({ currentMonth: e.target.text });

        $.get('/getPostList', { month: e.target.text }, function(data)
        {
            let posts = this.addKeys(data);

            this.setState({ posts: posts });
        }.bind(this));
    }

    handlePostClick(e)
    {
        //Load selected article
    }

    sendComment(comment)
    {
        //Sanitize comment and send to server
    }
    
    handleSearch(value)
    {
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
    
    makeMonth(value)
    {
        //List of all months of year
        const possibleMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        //Line up month integer value with respective index in possibleMonths
        let month = possibleMonths[value.month - 1];
        
        //Make string out of month and year and return it
        return month + ' ' + value.year;
    }

    render()
    {
        //Make string version of months array in state
        let months = [];
        for(let i = 0;i < this.state.months.length;i++)
        {
            months[i] = {};
            months[i].value = this.makeMonth(this.state.months[i]);
        }
        
        //Add keys to months array
        let monthOptions = this.addKeys(months);
        
        return(
            <div>
                <SearchBox results={this.state.searchResults} active={this.state.searchOpen} onSubmit={(value) => this.handleSearch(value)} />
                <div>
                    <h4>Archive</h4>
                    <Button onClick={this.handleButtonClick} month={this.state.currentMonth} />
                    <OptionList onClick={this.handleMonthClick} items={monthOptions} active={this.state.listOpen} />
                    <PostList onClick={this.handlePostClick} items={this.state.posts} />
                </div>
                <CommentsBox items={this.state.comments} onSendComment={(comment) => this.sendComment(comment)} />
            </div>
        );
    }
}
