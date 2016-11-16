import React from 'react';

export default class ImageInput extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { inputValue: '' };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleChange(e)
    {
        this.setState({ inputValue: e.target.value });
    }
    
    handleClick()
    {
        this.props.onSubmit(this.state.inputValue);
    }
    
    render()
    {
        return(
            <div>
                <input type="text" placeholder="Image URL..." className="textInput" onChange={this.handleChange} />
                <button className="button" onClick={this.handleClick}>Submit image</button>
            </div>
        );
    }
}
