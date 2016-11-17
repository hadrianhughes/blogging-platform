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
        $.get('/login', { name: details.name, password: details.password }, function()
        {
            window.location.reload();
        });
    }
    
    makeBlog(blogInfo)
    {
        console.log(blogInfo);
        $.post('/makeBlog', { name: blogInfo.name, password: blogInfo.password }, function()
        {
            console.log('.');
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
