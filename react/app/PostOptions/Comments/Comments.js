import React from 'react';

import Button from './Button';
import NumInput from './NumInput';

export default class Comments extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { comments:true, profanity: false, limit: false, length: 0 }
        
        this.toggleProfanity = this.toggleProfanity.bind(this);
        this.toggleComments = this.toggleComments.bind(this);
        this.toggleLimit = this.toggleLimit.bind(this);
        this.handleNumChange = this.handleNumChange.bind(this);
    }
    
    toggleComments()
    {
        let newVal = this.state.comments ? false : true;
        
        if(!newVal)
        {
            //Add all state variables to this
            this.setState({ comments: newVal, profanity: newVal, limit: newVal, length: 0 });
        }
        else
        {
            this.setState({ comments: newVal });
        }
    }
    
    toggleProfanity()
    {
        if(this.state.comments)
        {
            let newVal = this.state.profanity ? false : true;
            this.setState({ profanity: newVal });
        }
    }
    
    toggleLimit()
    {
        if(this.state.comments)
        {
            let newVal = this.state.limit ? false : true;
            
            if(!newVal)
            {
                this.setState({ limit: newVal, length: 0 });
            }
            else
            {
                this.setState({ limit: newVal });
            }
        }
    }
    
    handleNumChange(e)
    {
        this.setState({ length: e.target.value });
    }
    
    render()
    {
        return(
            <div>
                <h3>Comments</h3>
                <Button value="Allow comments" active={this.state.comments} onClick={this.toggleComments} />
                <Button value="Allow profanity" active={this.state.profanity} onClick={this.toggleProfanity} />
                <div>
                    <Button value="Limit length" active={this.state.limit} onClick={this.toggleLimit} />
                    {this.state.limit ? <NumInput onChange={this.handleNumChange} /> : null}
                </div>
            </div>
        );
    }
}
