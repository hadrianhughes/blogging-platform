import React from 'react';

import InputBox from './InputBox';

export default class Comments extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { value: '' };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e)
    {
        if(this.props.charLimit > 0)
        {
            if((this.props.charLimit - e.target.value.length) >= 0)
            {
                let newVal = this.state.charLimit - e.target.value.length;
                this.setState({ remainingChars: newVal, value: e.target.value });
            }
        }
        else
        {
            console.log(100 - e.target.value.length);
            if((100 - e.target.value.length) >= 0)
            {
                let newVal = this.state.charLimit - e.target.value.length;
                this.setState({ remainingChars: newVal, value: e.target.value });
            }
        }
    }
    
    handleSubmit()
    {
        if(this.props.charLimit > 0)
        {
            if((this.props.charLimit - this.state.value.length) >= 0)
            {
                this.props.onSendComment(this.state.value);
                this.setState({ value: '' });
            }
        }
        else
        {
            if((100 - this.state.value.length) >= 0)
            {
                this.props.onSendComment(this.state.value);
                this.setState({ value: '' });
            }
        }
    }
    
    render()
    {
        let items = this.props.items.map((item) => <li key={item.id}><div className="mobComment">{item.value}</div></li>);
        
        let remainingChars;
        if(this.props.charLimit > 0)
        {
            remainingChars = this.props.charLimit - this.state.value.length;
        }
        else
        {
            remainingChars = 100 - this.state.value.length;
        }
        
        return(
            <div id="mobCommentsBox">
                <h4>Comments</h4>
                <ul>{items}</ul>
                <InputBox value={this.state.value} remainingChars={remainingChars} onChange={this.handleChange} onSubmit={this.handleSubmit} />
            </div>
        );
    }
}
