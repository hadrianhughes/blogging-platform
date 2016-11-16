import React from 'react';

import ImageInput from '../../../ImageInput';
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
                <ImageInput onSubmit={(url) => this.handleSubmit(url)} isClosable={false} />
                <Image src={this.props.banner} />
            </div>
        );
    }
}
