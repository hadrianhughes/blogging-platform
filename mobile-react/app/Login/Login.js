import React from 'react';

export default class Login extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { email: '', password: '' };
        
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    
    handleEmailChange(e)
    {
        this.setState({ email: e.target.value });
    }
    
    handlePasswordChange(e)
    {
        this.setState({ password: e.target.value });
    }
    
    handleLogin()
    {
        $.post('/login', { email: this.state.email, password: this.state.password }, function(data)
        {
            $.get('/getLoginCookie', { email: this.state.email, value: data }, function()
            {
                window.location.replace('/');
            });
        }.bind(this));
    }
    
    render()
    {
        return(
            <div id="mobLoginForm">
                <h1>Login</h1>
                <input type="text" placeholder="Email..." className="textInput margin-bottom" onChange={this.handleEmailChange} />
                <br />
                <input type="password" placeholder="Password..." className="textInput margin-bottom" onChange={this.handlePasswordChange} />
                <br />
                <button className="button margin-right" onClick={this.handleLogin}>Login</button>
                <button className="button" onClick={this.props.onChangePage}>Back to Blog</button>
            </div>
        );
    }
}
