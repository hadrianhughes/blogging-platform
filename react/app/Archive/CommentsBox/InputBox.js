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
            <div>
                <textarea rows="3" cols="10" onChange={this.handleChange} />
                <button onClick={this.sendComment}>Send</button>
            </div>
        );
    }
}
