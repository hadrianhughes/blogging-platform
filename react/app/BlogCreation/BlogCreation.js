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
    }
    
    togglePage()
    {
        if(this.state.isSignIn && !this.state.isSignUp)
        {
            this.setState({ isSignIn: false, isSignUp: true });
        }
        else
        {
            this.setState({ isSignIn: true, isSignUp: false });
        }
    }
    
    login()
    {
        
    }
    
    render()
    {
        return(
            <div>
                {this.state.isSignIn ? <SignIn onSubmit={this.login} onTogglePage={this.togglePage} onReturn={this.props.onReturn} /> : null}
                {this.state.isSignUp ? <SignUp onSubmit={this.makeBlog} onTogglePage={this.togglePage} onReturn={this.props.onReturn} /> : null}
            </div>
        );
    }
}
