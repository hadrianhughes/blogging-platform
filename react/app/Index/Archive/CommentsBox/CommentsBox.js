import React from 'react';

import InputBox from './InputBox';

export default class CommentsBox extends React.Component
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
        let newVal = this.state.charLimit - e.target.value.length;
        this.setState({ remainingChars: newVal, value: e.target.value });
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
        let items = this.props.items.map((item) => <li key={item.id} className="comment"><div className="commentAuthor">{item.author}</div><div className="commentBody">{item.value}</div></li>);

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
            <div id="commentsBox">
                <h4>Comments</h4>
                <ul className="border">{items}</ul>
                <InputBox value={this.state.value} remainingChars={remainingChars} onChange={this.handleChange} onSubmit={this.handleSubmit} />
            </div>
        );
    }
}
