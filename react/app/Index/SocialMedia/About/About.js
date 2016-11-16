import React from 'react';

import Photo from './Photo';
import Bio from './Bio';

export default class About extends React.Component
{
    constructor()
    {
        super();
        
        let bio = 'Lorem ipsum dolor sit amet';
        let maxLength = 300;
        this.state = { isEditingPhoto: false, isEditingBio: false, bioValue: bio, maxBioLength: maxLength };
        
        this.handlePhotoClick = this.handlePhotoClick.bind(this);
        this.handleBioClick = this.handleBioClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handlePhotoClick()
    {
        console.log('clicked photo');
    }
    
    handleBioClick()
    {
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
        if(e.target.value.length <= this.state.maxBioLength)
        {
            this.setState({ bioValue: e.target.value });
        }
    }
    
    render()
    {
        return(
            <div className="larger-padding" id="about">
                <Photo onClick={this.handlePhotoClick} editing={this.state.isEditingPhoto} />
                <Bio onClick={this.handleBioClick} onChange={this.handleChange} editing={this.state.isEditingBio} value={this.state.bioValue} />
            </div>
        );
    }
}
