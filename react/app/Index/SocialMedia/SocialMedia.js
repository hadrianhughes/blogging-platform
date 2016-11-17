import React from 'react';

import About from './About/About';

export default class SocialMedia extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { bio: '', photo: '' };
    }
    
    componentDidMount()
    {
        $.get('/getBlogInfo', function(data)
        {
            console.log(data);
            this.setState({ bio: data.bio, photo: data.photo });
        }.bind(this));
    }
    
    render()
    {
        return(
            <About bio={this.state.bio} photo={this.state.photo} onClick={this.props.onPhotoClick} />
        );
    }
}
