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
        
        this.handleClick = this.handleClick.bind(this);
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
        
        this.setState({ currentMonth: 'January 2016',
            posts: [{ id: 1, name: 'Lorem ipsum' }, { id: 2, name: 'dolor sit amet' }]
        });
    }
    
    handleClick()
    {
        let value = this.state.listOpen ? false : true;
        
        this.setState({ listOpen: value });
    }
    
    render()
    {
        return(
            <div>
                <Button onClick={this.handleClick} month={this.state.currentMonth} />
                {this.state.listOpen ? <OptionList items={this.state.months} /> : null}
                <PostList items={this.state.posts} />
            </div>
        );
    }
}
