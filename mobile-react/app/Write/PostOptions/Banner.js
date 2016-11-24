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
            <div className="margin-bottom">
                <h1>Banner: </h1>
                <input type="text" placeholder="Image URL..." className="textInput mobile-font-size" id="mobBannerInput" onChange={this.handleChange} />
                <button className="button mobile-font-size" onClick={this.handleSubmit}>Load image</button><br />
                <img src={this.props.banner} />
            </div>
        );
    }
}
