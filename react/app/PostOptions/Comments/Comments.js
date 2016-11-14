import React from 'react';

import Button from './Button';

export default class Comments extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { profanity: false }
        
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick()
    {
        console.log('.');
    }
    
    render()
    {
        return(
            <div>
                <h3>Comments</h3>
                <Button value="Allow profanity" active={this.state.profanity} onClick={this.handleClick} />
            </div>
        );
    }
}
