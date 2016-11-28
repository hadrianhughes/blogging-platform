import React from 'react';
import ReactDOM from 'react-dom';

import Menu from './Menu/Menu';
import Index from './Index/Index';
import Write from './Write/Write';
import Login from './Login/Login';

class App extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { isMenu: true, isIndex: false, isWrite: false, isLogin: false };
        
        this.changeToMenu = this.changeToMenu.bind(this);
        this.changeToIndex = this.changeToIndex.bind(this);
        this.changeToWrite = this.changeToWrite.bind(this);
        this.changeToLogin = this.changeToLogin.bind(this);
    }
    
    componentDidMount()
    {
        $.get('/hasBlogCookie', function(data)
        {
            if(data)
            {
                this.setState({ isMenu: false, isIndex: true, isWrite: false, isLogin: false });
            }
        }.bind(this));
    }
    
    changeToMenu()
    {
        this.setState({ isMenu: true, isIndex: false, isWrite: false, isLogin: false });
    }
    
    changeToIndex()
    {
        this.setState({ isMenu: false, isIndex: true, isWrite: false, isLogin: false });
    }
    
    changeToWrite()
    {
        $.get('/isLoggedIn', function(data)
        {
            if(data.loggedIn)
            {
                this.setState({ isMenu: false, isIndex: false, isWrite: true, isLogin: false });
            }
            else
            {
                window.location.reload();
            }
        }.bind(this));
    }
    
    changeToLogin()
    {
        this.setState({ isMenu: false, isIndex: false, isWrite: false, isLogin: true });
    }
    
    render()
    {
        return(
            <div>
                {this.state.isMenu ? <Menu onChangePage={this.changeToIndex} changeToLogin={this.changeToLogin} /> : null}
                {this.state.isIndex ? <Index onChangePage={this.changeToWrite} onLogin={this.changeToLogin} backToMenu={this.changeToMenu} /> : null}
                {this.state.isWrite ? <Write onChangePage={this.changeToIndex} /> : null}
                {this.state.isLogin ? <Login onChangePage={this.changeToIndex} /> : null}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
