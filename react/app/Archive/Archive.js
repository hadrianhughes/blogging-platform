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

        this.state = { listOpen: false, searchOpen: false, currentMonth: '', months: [], posts: [], comments: [{ id: 1, author: 'Joe Bloggs', comment: 'Hello world' }, { id: 2, author: 'Jane Doe', comment: 'Lorem ipsum' }, { id: 3, author: 'John Smith', comment: 'Blah blah' }], searchResults: [] };

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleMonthClick = this.handleMonthClick.bind(this);
        this.handlePostClick = this.handlePostClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.sendComment = this.sendComment.bind(this);
        this.addKeys = this.addKeys.bind(this);
        this.closeSearch = this.closeSearch.bind(this);
    }

    componentDidMount()
    {
        //Get month list from server
        $.get('/getMonths', function(data)
        {
            let months = this.addKeys(data);
            
            this.setState({ months: months });
        }.bind(this));

        //Get post list from server based on current month
        $.get('/getPostList', { month: this.state.currentMonth }, function(data)
        {
            let posts = this.addKeys(data);

            this.setState({ posts: posts });
        }.bind(this));

        this.setState({ currentMonth: 'January 2016' }); //Change this for a get request to get default month
    }

    handleButtonClick()
    {
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
        console.log(comment);
    }
    
    handleSearch(value)
    {
        $.get('/search', { query: value }, function(data)
        {
            let results = this.addKeys(data);
            
            this.setState({ searchResults: results, searchOpen: true });
        }.bind(this));
    }
    
    closeSearch()
    {
        this.setState({ searchOpen: false });
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

    render()
    {
        return(
            <div>
                <SearchBox results={this.state.searchResults} active={this.state.searchOpen} onSubmit={this.state.searchOpen ? this.closeSearch : (value) => this.handleSearch(value)} />
                <div>
                    <h4>Archive</h4>
                    <Button onClick={this.handleButtonClick} month={this.state.currentMonth} />
                    <OptionList onClick={this.handleMonthClick} items={this.state.months} active={this.state.listOpen} />
                    <PostList onClick={this.handlePostClick} items={this.state.posts} />
                </div>
                <CommentsBox items={this.state.comments} onSendComment={(comment) => this.sendComment(comment)} />
            </div>
        );
    }
}
