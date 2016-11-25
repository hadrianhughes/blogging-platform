import React from 'react';
import ReactDOM from 'react-dom';

import Index from './Index/Index';
import Write from './Write/Write';
import Login from './Login/Login';

class App extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { isIndex: true, isWrite: false };
        
        this.changeToIndex = this.changeToIndex.bind(this);
        this.changeToWrite = this.changeToWrite.bind(this);
        this.changeToLogin = this.changeToLogin.bind(this);
    }
    
    changeToIndex()
    {
        this.setState({ isIndex: true, isWrite: false, isLogin: false });
    }
    
    changeToWrite()
    {
        $.get('/isLoggedIn', function(data)
        {
            if(data.loggedIn)
            {
                this.setState({ isIndex: false, isWrite: true, isLogin: false });
            }
            else
            {
                window.location.reload();
            }
        }.bind(this));
    }
    
    changeToLogin()
    {
        this.setState({ isIndex: false, isWrite: false, isLogin: true });
    }
    
    render()
    {
        return(
            <div>
                {this.state.isIndex ? <Index onChangePage={this.changeToWrite} onLogin={this.changeToLogin} /> : null}
                {this.state.isWrite ? <Write onChangePage={this.changeToIndex} /> : null}
                {this.state.isLogin ? <Login onChangePage={this.changeToIndex} /> : null}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
