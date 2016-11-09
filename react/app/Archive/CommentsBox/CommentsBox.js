import React from 'react';

import InputBox from './InputBox';

export default class CommentsBox extends React.Component
{
    render()
    {
        let items = this.props.items.map((item) => <li key={item.id} className="comment"><div className="commentAuthor">{item.author}</div><div className="commentBody">{item.comment}</div></li>);

        return(
            <div id="commentsBox">
                <h4>Comments</h4>
                <ul className="border">{items}</ul>
                <InputBox onSubmit={(comment) => this.props.onSendComment(comment)} />
            </div>
        );
    }
}
