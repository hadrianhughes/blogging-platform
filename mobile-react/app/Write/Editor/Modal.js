import React from 'react';

export default class Modal extends React.Component
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
        this.props.onSubmit({ type: this.props.type, value: this.state.value });
    }
    
    render()
    {
        //Modal has different contents depending on the context in which it was opened
        let retVal;
        switch(this.props.type)
        {
            case 0:
                retVal = null;
                break;
            case 1:
                retVal = <div id="mobModal"><input type="text" placeholder="Image URL..." className="textInput mobile-font-size" onChange={this.handleChange} /><button className="button mobile-font-size" onClick={this.handleSubmit}>Insert</button><button className="button mobile-font-size" onClick={this.props.onClose}>Close</button></div>;
                break;
            case 2:
                retVal = <div id="mobModal"><input type="text" placeholder="URL..." className="textInput mobile-font-size" onChange={this.handleChange} /><button className="button mobile-font-size" onClick={this.handleSubmit}>Insert</button><button className="button mobile-font-size" onClick={this.props.onClose}>Close</button></div>;
                break;
            default:
                retVal = null;
        }

        return retVal;
    }
}
