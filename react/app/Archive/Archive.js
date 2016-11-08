import React from 'react';

import Button from './Button';
import OptionList from './OptionList';
import PostList from './PostList';

export default class Archive extends React.Component
{
    constructor()
    {
        super();

        this.state = { listOpen: false, currentMonth: '', months: [], posts: [] };

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleMonthClick = this.handleMonthClick.bind(this);
    }

    componentDidMount()
    {
        //Get data from server here
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

        $.get('/getPosts', { month: this.state.currentMonth }, function(data)
        {
            let counter = 0;
            let posts = data.map(function(post)
            {
                counter++;
                return { id: counter, articleId: post.id, name: post.name };
            });

            this.setState({ posts: posts });
        }.bind(this));

        this.setState({ currentMonth: 'January 2016' });
    }

    handleButtonClick()
    {
        let value = this.state.listOpen ? false : true;

        this.setState({ listOpen: value });
    }

    handleMonthClick(e)
    {
        this.setState({ currentMonth: e.target.text });

        $.get('/getPosts', { month: e.target.text }, function(data)
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

    render()
    {
        return(
            <div>
                <Button onClick={this.handleButtonClick} month={this.state.currentMonth} />
                <OptionList onClick={this.handleMonthClick} items={this.state.months} active={this.state.listOpen} />
                <PostList items={this.state.posts} />
            </div>
        );
    }
}
