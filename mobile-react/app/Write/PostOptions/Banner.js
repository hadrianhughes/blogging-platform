import React from 'react';

export default class Banner extends React.Component
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
        this.setState({ value: e.target.value });
    }
    
    handleSubmit()
    {
        this.props.onSubmit(this.state.value);
    }
    
    render()
    {
        return(
            <div>
                <h1>Banner: </h1>
                <input type="text" placeholder="Image URL..." className="textInput" id="mobBannerInput" onChange={this.handleChange} />
                <button className="button" onClick={this.handleSubmit}>Load image</button>
                <img src={this.props.banner} />
            </div>
        );
    }
}