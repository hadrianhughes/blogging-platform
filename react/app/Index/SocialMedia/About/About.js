import React from 'react';

import Photo from './Photo';
import Bio from './Bio';

export default class About extends React.Component
{
    constructor()
    {
        super();

        let bio = 'Lorem ipsum dolor sit amet'; //Bio should be gotten from server
        let maxLength = 300;
        this.state = { isEditingPhoto: false, isEditingBio: false, bioValue: bio, maxBioLength: maxLength };

        this.handleBioClick = this.handleBioClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleBioClick()
    {
        //Toggle isEditingBio
        let newVal;
        if(this.state.isEditingBio)
        {
            newVal = false;
        }
        else
        {
            newVal = true;
        }
        this.setState({ isEditingBio: newVal });
    }

    handleChange(e)
    {
        //Only update bioValue if the maxLength hasn't been reached
        if(e.target.value.length <= this.state.maxBioLength)
        {
            this.setState({ bioValue: e.target.value });
        }
    }

    render()
    {
        return(
            <div className="larger-padding" id="about">
                <Photo onClick={this.props.onClick} editing={this.state.isEditingPhoto} />
                <Bio onClick={this.handleBioClick} onChange={this.handleChange} editing={this.state.isEditingBio} value={this.state.bioValue} />
            </div>
        );
    }
}
