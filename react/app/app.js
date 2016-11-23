import React from 'react';
import ReactDOM from 'react-dom';

import Index from './Index/Index';
import Write from './Write/Write';
import BlogCreation from './BlogCreation/BlogCreation';

class App extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { isIndex: true, isWrite: false, isBlogCreation: false };
        
        this.changeToWrite = this.changeToWrite.bind(this);
        this.changeToIndex = this.changeToIndex.bind(this);
        this.changeToBlogCreation = this.changeToBlogCreation.bind(this);
    }
    
    changeToWrite()
    {
        $.get('/isLoggedIn', function(data)
        {
            console.log(data);
            if(data.loggedIn)
            {
                this.setState({ isIndex: false, isWrite: true, isBlogCreation: false });
            }
            else
            {
                window.location.reload();
            }
        }.bind(this));
    }
    
    changeToIndex()
    {
        this.setState({ isIndex: true, isWrite: false, isBlogCreation: false });
    }
    
    changeToBlogCreation()
    {
        this.setState({ isIndex: false, isWrite: false, isBlogCreation: true });
    }
    
    render()
    {
        return(
            <div>
                {this.state.isIndex ? <Index changeToWrite={this.changeToWrite} changeToBlogCreation={this.changeToBlogCreation} /> : null}
                {this.state.isWrite ? <Write onPageChange={this.changeToIndex} /> : null}
                {this.state.isBlogCreation ? <BlogCreation onReturn={this.changeToIndex} /> : null}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
