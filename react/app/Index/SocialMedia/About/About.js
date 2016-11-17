import React from 'react';

import Photo from './Photo';
import Bio from './Bio';

export default class About extends React.Component
{
    constructor()
    {
        super();

        this.state = { isEditingPhoto: false, isEditingBio: false };

        this.handleBioClick = this.handleBioClick.bind(this);
    }

    handleBioClick()
    {
        //Toggle isEditingBio
        let newVal;
        if(this.state.isEditingBio)
        {
            newVal = false;
            this.props.onUpdateBio();
        }
        else
        {
            newVal = true;
        }
        this.setState({ isEditingBio: newVal });
    }

    render()
    {
        return(
            <div className="larger-padding" id="about">
                <Photo loggedIn={this.props.loggedIn} src={this.props.photo} onClick={this.props.onClick} editing={this.state.isEditingPhoto} />
                <Bio loggedIn={this.props.loggedIn} onClick={this.handleBioClick} onChange={this.props.onChange} editing={this.state.isEditingBio} value={this.props.bio} />
            </div>
        );
    }
}
