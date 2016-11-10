import React from 'react';

import InputBox from './InputBox';

export default class CommentsBox extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { charLimit: 100, remainingChars: 100 };
        
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(length)
    {
        var newVal = this.state.charLimit - length;
        this.setState({ remainingChars: newVal });
    }
    
    render()
    {
        let items = this.props.items.map((item) => <li key={item.id} className="comment"><div className="commentAuthor">{item.author}</div><div className="commentBody">{item.comment}</div></li>);

        return(
            <div id="commentsBox">
                <h4>Comments</h4>
                <ul className="border">{items}</ul>
                <InputBox remainingChars={this.state.remainingChars} onChange={(length) => this.handleChange(length)} onSubmit={(comment) => this.props.onSendComment(comment)} />
            </div>
        );
    }
}
