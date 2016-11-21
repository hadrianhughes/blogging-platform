import React from 'react';
import ReactDOM from 'react-dom';

import Content from './Content/Content';
import BlogInfo from './BlogInfo/BlogInfo';

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
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
