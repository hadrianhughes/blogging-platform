import React from 'react';

export default class Menu extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { blogs: [] };
        
        this.handleBlogClick = this.handleBlogClick.bind(this);
        this.addKeys = this.addKeys.bind(this);
    }
    
    componentDidMount()
    {
        $.get('/getBlogs', function(data)
        {
            let blogs = this.addKeys(data);
            blogs = data.map((blog) => <li key={blog.id} onClick={() => this.handleBlogClick(blog._id)}>{blog.name}</li>);
            
            this.setState({ blogs: blogs });
        }.bind(this));
    }
    
    handleBlogClick(blogId)
    {
        $.get('/getBlogCookie', { blog: blogId }, function()
        {
            this.props.onChangePage();
        }.bind(this));
    }
    
    addKeys(set)
    {
        let counter = 0;

        let retSet = set.map(function(item)
        {
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
                <ul>{this.state.blogs}</ul>
            </div>
        );
    }
}
