import React from 'react';

export default class InputBox extends React.Component
{
    constructor()
    {
        super();

        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.sendComment = this.sendComment.bind(this);
    }

    handleChange(e)
    {
        this.setState({ value: e.target.value });
    }

    sendComment()
    {
        this.props.onSubmit(this.state.value);
    }

    render()
    {
        return(
            <form>
                <input id="commentInput" type="text" onChange={this.handleChange} />
                <input className="button" type="button" onClick={this.sendComment} value="Send" />
            </form>
        );
    }
}
