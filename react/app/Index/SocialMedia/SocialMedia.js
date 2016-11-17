import React from 'react';

import About from './About/About';

export default class SocialMedia extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { bio: '', photo: '' };
        
        this.getBlogInfo = this.getBlogInfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateBio = this.updateBio.bind(this);
    }
    
    componentDidMount()
    {
        this.getBlogInfo();
    }
    
    getBlogInfo()
    {
        $.get('/getBlogInfo', function(data)
        {
            console.log(data);
            this.setState({ bio: data.bio, photo: data.photo });
        }.bind(this));
    }
    
    handleChange(string)
    {
        this.setState({ bio: string });
    }
    
    updateBio()
    {
        $.post('/updateBio', { bio: this.state.bio }, function()
        {
            getBlogInfo();
        });
    }
    
    render()
    {
        return(
            <About bio={this.state.bio} photo={this.state.photo} onClick={this.props.onPhotoClick} onChange={this.handleChange} onUpdateBio={this.updateBio} />
        );
    }
}
