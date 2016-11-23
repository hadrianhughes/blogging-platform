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
        
        this.changeToWrite = this.changeToWrite.bind(this);
        this.changeToLogin = this.changeToLogin.bind(this);
    }
    
    changeToWrite()
    {
        this.setState({ isIndex: false, isWrite: true, isLogin: false });
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
                {this.state.isWrite ? <Write /> : null}
                {this.state.isLogin ? <Login /> : null}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
