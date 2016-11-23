import React from 'react';

import About from './About/About';

export default class SocialMedia extends React.Component
{
    render()
    {
        return(
            <About loggedIn={this.props.loggedIn} bio={this.props.bio} photo={this.props.photo} onClick={(loggedIn) => this.props.onPhotoClick(loggedIn)} onChange={this.props.onBioChange} onUpdateBio={this.props.updateBio} />
        );
    }
}
