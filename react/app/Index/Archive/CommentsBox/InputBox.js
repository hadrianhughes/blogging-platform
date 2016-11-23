import React from 'react';

export default class InputBox extends React.Component
{
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
                <input value={this.props.value} className="textInput" id="commentInput" type="text" placeholder="Leave a comment..." onChange={this.props.onChange} />
                <input className="button" type="button" onClick={this.props.onSubmit} value="Send" />
                {colorActive ? <p className={pColor}>{this.props.remainingChars}</p> : <p>{this.props.remainingChars}</p>}
            </form>
        );
    }
}
