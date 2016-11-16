import React from 'react';

import ImageInput from '../../../ImageInput';
import Input from './Input';
import Button from './Button';
import Image from './Image';

export default class Banner extends React.Component
{
    constructor()
    {
        super();
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(url)
    {
        this.props.onSubmit(url);
    }
    
    render()
    {
        return(
            <div>
                <h3>Banner</h3>
                <ImageInput onSubmit={(url) => this.handleSubmit(url)} />
                <Image src={this.props.banner} />
            </div>
        );
    }
}
