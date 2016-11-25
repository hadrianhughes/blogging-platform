import React from 'react';

export default class Login extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { name: '', password: '' };
        
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    
    handleNameChange(e)
    {
        this.setState({ name: e.target.value });
    }
    
    handlePasswordChange(e)
    {
        this.setState({ password: e.target.value });
    }
    
    handleLogin()
    {
        $.get('/login', { name: this.state.name, password: this.state.password }, function()
        {
            window.location.reload();
        });
    }
    
    render()
    {
        return(
            <div id="mobLoginForm">
                <h1>Login</h1>
                <input type="text" placeholder="Name..." className="textInput margin-bottom" onChange={this.handleNameChange} />
                <br />
                <input type="password" placeholder="Password..." className="textInput margin-bottom" onChange={this.handlePasswordChange} />
                <br />
                <button className="button margin-right" onClick={this.handleLogin}>Login</button>
                <button className="button" onClick={this.props.onChangePage}>Back to Blog</button>
            </div>
        );
    }
}
