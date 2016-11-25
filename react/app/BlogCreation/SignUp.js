import React from 'react';

export default class SignIn extends React.Component
{
    constructor()
    {
        super();

        this.state = { blogName: '', password: '' };

        this.handleBlogNameChange = this.handleBlogNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleBlogNameChange(e)
    {
        this.setState({ blogName: e.target.value });
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
        const blogInfo = { name: this.state.blogName, email: this.state.email, password: this.state.password };
        this.props.onSubmit(blogInfo);
    }

    render()
    {
        return(
            <div id="loginForm" className="center-text">
                <h1 className="margin-bottom">Make a blog</h1>
                <input type="text" placeholder="Blog name..." className="textInput margin-bottom" onChange={this.handleBlogNameChange} /><br />
                <input type="text" placeholder="Email..." className="textInput margin-bottom" onChange={this.handleEmailChange} /><br />
                <input type="password" className="textInput margin-bottom" placeholder="Password..." onChange={this.handlePasswordChange} /><br />
                <button className="button margin-bottom margin-right" onClick={this.handleClick}>Start blogging</button>
                <button className="button margin-bottom" onClick={this.props.onTogglePage}>Sign in</button><br />
                <button className="button margin-bottom" onClick={this.props.onReturn}>Back to Blog</button>
            </div>
        );
    }
}
