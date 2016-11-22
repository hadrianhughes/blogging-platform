import React from 'react';

export default class InputBox extends React.Component
{
    render()
    {
        return(
            <form>
                <input value={this.props.value} onChange={this.props.onChange} id="mobCommentInput" type="text" placeholder="Leave a comment..." />
                <input id="mobSendComment" onClick={this.props.onSubmit} value="Send" />
            </form>
        );
    }
}
