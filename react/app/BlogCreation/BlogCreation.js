import React from 'react';

import SignIn from './SignIn';
import SignUp from './SignUp';

export default class BlogCreation extends React.Component
{
    constructor()
    {
        super();

        this.state = { isSignIn: true, isSignUp: false };

        this.togglePage = this.togglePage.bind(this);
        this.login = this.login.bind(this);
        this.makeBlog = this.makeBlog.bind(this);
    }

    togglePage()
    {
        //If the sign in page is active and the sign up page is not
        if(this.state.isSignIn && !this.state.isSignUp)
        {
            this.setState({ isSignIn: false, isSignUp: true });
        }
        else
        {
            this.setState({ isSignIn: true, isSignUp: false });
        }
    }

    login(details)
    {
        //Send login details to server which will return a cookie to keep user logged in
        $.post('/login', { email: details.email, password: details.password }, function(data)
        {
            $.get('/getLoginCookie', { email: details.email, value: data }, function()
            {
                window.location.replace('/');
            });
        });
    }
    
    makeBlog(blogInfo)
    {
        $.post('/makeBlog', { name: blogInfo.name, email: blogInfo.email, password: blogInfo.password }, function()
        {
            window.location.reload();
        });
    }

    render()
    {
        return(
            <div>
                {this.state.isSignIn ? <SignIn onSubmit={(details) => this.login(details)} onTogglePage={this.togglePage} onReturn={this.props.onReturn} /> : null}
                {this.state.isSignUp ? <SignUp onSubmit={this.makeBlog} onTogglePage={this.togglePage} onReturn={this.props.onReturn} /> : null}
            </div>
        );
    }
}
