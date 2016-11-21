import React from 'react';
import ReactDOM from 'react-dom';

import Content from './Content/Content';
import BlogInfo from './BlogInfo/BlogInfo';
import PostList from './PostList/PostList';

class App extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { title: '', text: '', photo: '', bio: '' };
    }
    
    componentDidMount()
    {
        $.get('/getBlogInfo', function(data)
        {
            this.setState({ photo: data.photo, bio: data.bio });
        }.bind(this));
    }
    
    render()
    {
        return(
            <div>
                <BlogInfo photo={this.state.photo} bio={this.state.bio} />
                <Content title={this.state.title} text={this.state.text} />
                <PostList />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
