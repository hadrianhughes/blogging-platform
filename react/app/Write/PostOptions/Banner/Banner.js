import React from 'react';

import Input from './Input';
import Button from './Button';
import Image from './Image';

export default class Banner extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { currentUrl: '', finalUrl: '' };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleChange(e)
    {
        this.setState({ currentUrl: e.target.value });
    }
    
    handleClick()
    {
        this.setState({ finalUrl: this.state.currentUrl });
    }
    
    render()
    {
        return(
            <div>
                <h3>Banner</h3>
                <div>
                    <Input onChange={this.handleChange} />
                    <Button onClick={this.handleClick} />
                </div>
                <Image src={this.state.finalUrl} />
            </div>
        );
    }
}
