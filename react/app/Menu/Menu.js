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
            blogs = data.map((blog) => <li key={blog.id}><a href="#" onClick={() => this.handleBlogClick(blog._id)}>{blog.name}</a></li>);
            
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
            <div id="blog-list-cont">
                <ul id="blog-list" className="border">{this.state.blogs}</ul>
                
                <div className="footer">
                    <a href="#" className="float-left" onClick={this.props.changeToBlogCreation}>Make a blog</a>
                    <a href="#" className="float-right">[BRAND NAME]</a>
                </div>
            </div>
        );
    }
}
