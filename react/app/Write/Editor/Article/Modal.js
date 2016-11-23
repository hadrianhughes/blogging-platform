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
                retVal = <div id="modal"><input type="text" placeholder="Image URL..." className="textInput" onChange={this.handleChange} /><button className="button" onClick={this.handleSubmit}>Insert</button><button className="button" onClick={this.props.onClose}>Close</button></div>;
                break;
            case 2:
                retVal = <div id="modal"><input type="text" placeholder="URL..." className="textInput" onChange={this.handleChange} /><button className="button" onClick={this.handleSubmit}>Insert</button><button className="button" onClick={this.props.onClose}>Close</button></div>;
                break;
            case 3:
                retVal = <div id="modal"><input type="number" min="1" max="7" placeholder="3" className="textInput numInput" onChange={this.handleChange} /><button className="button" onClick={this.handleSubmit}>Change</button><br /><button className="button" onClick={this.props.onClose}>Close</button></div>;
                break;
            case 4:
                retVal = <div id="modal"><h3>Are you sure you want to submit the article with the currently selected settings?</h3><button className="button" onClick={this.handleSubmit}>Yes</button><button className="button" onClick={this.props.onClose}>No</button></div>;
                break;
            default:
                retVal = null;
        }

        return retVal;
    }
}
