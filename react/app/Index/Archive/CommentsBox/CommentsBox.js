import React from 'react';

import InputBox from './InputBox';

export default class CommentsBox extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { charLimit: 100, remainingChars: 100, value: '' };
        
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
        this.props.onSendComment(this.state.value);
        this.setState({ value: '' });
    }
    
    render()
    {
        let items = this.props.items.map((item) => <li key={item.id} className="comment"><div className="commentAuthor">{item.author}</div><div className="commentBody">{item.value}</div></li>);

        return(
            <div id="commentsBox">
                <h4>Comments</h4>
                <ul className="border">{items}</ul>
                <InputBox value={this.state.value} remainingChars={this.state.remainingChars} onChange={this.handleChange} onSubmit={this.handleSubmit} />
            </div>
        );
    }
}
