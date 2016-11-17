import React from 'react';

import Photo from './Photo';
import Bio from './Bio';

export default class About extends React.Component
{
    constructor()
    {
        super();

        this.state = { isEditingPhoto: false, isEditingBio: false, maxBioLength: 300 };

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
        this.props.onUpdateBio();
    }

    handleChange(e)
    {
        //Only update bioValue if the maxLength hasn't been reached
        if(e.target.value.length <= this.state.maxBioLength)
        {
            this.props.onChange(e.target.value);
        }
    }

    render()
    {
        return(
            <div className="larger-padding" id="about">
                <Photo src={this.props.photo} onClick={this.props.onClick} editing={this.state.isEditingPhoto} />
                <Bio onClick={this.handleBioClick} onChange={this.handleChange} editing={this.state.isEditingBio} value={this.props.bio} />
            </div>
        );
    }
}
