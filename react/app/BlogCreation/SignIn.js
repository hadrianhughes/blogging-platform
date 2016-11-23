import React from 'react';

export default class SignIn extends React.Component
{
    constructor()
    {
        super();

        this.state = { name: '', password: '' };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleUsernameChange(e)
    {
        this.setState({ name: e.target.value });
    }

    handlePasswordChange(e)
    {
        this.setState({ password: e.target.value });
    }

    handleClick()
    {
        const login = { name: this.state.name, password: this.state.password };
        this.props.onSubmit(login);
    }

    render()
    {
        return(
            <div id="loginForm" className="center-text">
                <h1 className="margin-bottom">Login</h1>
                <input type="text" placeholder="Username" className="textInput margin-bottom" onChange={this.handleUsernameChange} /><br />
                <input type="password" placeholder="Password" className="textInput margin-bottom" onChange={this.handlePasswordChange} /><br />
                <button className="button margin-bottom margin-right" onClick={this.handleClick}>Login</button>
                <button className="button margin-bottom" onClick={this.props.onTogglePage}>Sign Up</button><br />
                <button className="button margin-bottom" onClick={this.props.onReturn}>Back to Blog</button>
            </div>
        );
    }
}
