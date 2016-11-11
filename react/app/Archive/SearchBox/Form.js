import React from 'react';

export default class Form extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { value: '' };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleChange(e)
    {
        this.setState({ value: e.target.value });
    }
    
    handleClick()
    {
        this.props.onSubmit(this.state.value);
    }
    
    render()
    {
        return(
            <form id="searchForm">
                <input id="searchInput" className="textInput" type="text" onChange={this.handleChange} placeholder="Search posts..." />
                <input id="btnSearch" className="button" type="button" onClick={this.handleClick} value={this.props.active ? 'Close' : 'Search'} />
            </form>
        );
    }
}
