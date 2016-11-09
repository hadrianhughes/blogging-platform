import React from 'react';

import Button from './Button';
import OptionList from './OptionList';
import PostList from './PostList';
import CommentsBox from './CommentsBox';

export default class Archive extends React.Component
{
    constructor()
    {
        super();

        this.state = { listOpen: false, currentMonth: '', months: [], posts: [], comments: [{ id: 1, author: 'Joe Bloggs', comment: 'Hello world' }, { id: 2, author: 'Jane Doe', comment: 'Lorem ipsum' }, { id: 3, author: 'John Smith', comment: 'Blah blah' }] };

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleMonthClick = this.handleMonthClick.bind(this);
        this.handlePostClick = this.handlePostClick.bind(this);
    }

    componentDidMount()
    {
        //Get month list from server
        $.get('/getMonths', function(data)
        {
            let counter = 0;
            let months = data.map(function(month)
            {
                counter++;
                return { id: counter, value: month };
            });

            this.setState({ months: months });
        }.bind(this));

        //Get post list from server based on current month
        $.get('/getPostList', { month: this.state.currentMonth }, function(data)
        {
            let counter = 0;
            let posts = data.map(function(post)
            {
                counter++;
                return { id: counter, articleId: post.id, name: post.name };
            });

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
            let counter = 0;
            let posts = data.map(function(post)
            {
                counter++;
                return { id: counter, articleId: post.id, name: post.name };
            });

            this.setState({ posts: posts });
        }.bind(this));
    }
    
    handlePostClick(e)
    {
        //Load selected article
    }

    render()
    {
        return(
            <div>
                <Button onClick={this.handleButtonClick} month={this.state.currentMonth} />
                <OptionList onClick={this.handleMonthClick} items={this.state.months} active={this.state.listOpen} />
                <PostList onClick={this.handlePostClick} items={this.state.posts} />
                <CommentsBox items={this.state.comments} />
            </div>
        );
    }
}
