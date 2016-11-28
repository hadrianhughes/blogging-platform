import React from 'react';

export default class SignIn extends React.Component
{
    constructor()
    {
        super();

        this.state = { name: '', password: '' };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleEmailChange(e)
    {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange(e)
    {
        this.setState({ password: e.target.value });
    }

    handleClick()
    {
        const login = { name: this.state.name, email: this.state.email, password: this.state.password };
        this.props.onSubmit(login);
    }

    render()
    {
        return(
            <div id="loginForm" className="center-text">
                <h1 className="margin-bottom">Login</h1>
                <input type="text" placeholder="Email..." className="textInput margin-bottom" onChange={this.handleEmailChange} /><br />
                <input type="password" placeholder="Password..." className="textInput margin-bottom" onChange={this.handlePasswordChange} /><br />
                <button className="button margin-bottom margin-right" onClick={this.handleClick}>Login</button>
                <button className="button margin-bottom" onClick={this.props.onTogglePage}>Sign Up</button><br />
                <button className="button margin-bottom" onClick={this.props.onReturn}>Back to Menu</button>
            </div>
        );
    }
}
