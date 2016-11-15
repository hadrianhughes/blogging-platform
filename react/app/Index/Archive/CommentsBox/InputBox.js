import React from 'react';

export default class InputBox extends React.Component
{
    constructor()
    {
        super();

        this.state = { value: '', remainingChars: 100 };

        this.handleChange = this.handleChange.bind(this);
        this.sendComment = this.sendComment.bind(this);
    }

    handleChange(e)
    {
        this.props.onChange(e.target.value.length);
        this.setState({ value: e.target.value });
    }

    sendComment()
    {
        this.props.onSubmit(this.state.value);
    }

    render()
    {
        let colorActive = false;
        let pColor;
        if(this.props.remainingChars < 1)
        {
            pColor = 'red';
            colorActive = true;
        }
        else if(this.props.remainingChars < 20)
        {
            colorActive = true;
            pColor = 'orange';
        }
        
        return(
            <form>
                <input className="textInput" id="commentInput" type="text" placeholder="Leave a comment..." onChange={this.handleChange} />
                <input className="button" type="button" onClick={this.sendComment} value="Send" />
                {colorActive ? <p className={pColor}>{this.props.remainingChars}</p> : <p>{this.props.remainingChars}</p>}
            </form>
        );
    }
}
