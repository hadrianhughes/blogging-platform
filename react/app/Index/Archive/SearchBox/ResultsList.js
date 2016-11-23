import React from 'react';

export default class ResultsList extends React.Component
{
    render()
    {
        let items = this.props.items.map((result) => <li key={result.id}><a href="#" onClick={() => this.props.onClick(result.id)}>{result.title}</a></li>);
        
        let retVal;
        if(this.props.active)
        {
            retVal = <ul className="active border" id="resultsList">{items}</ul>
        }
        else
        {
            retVal = <ul id="resultsList"></ul>
        }
        
        return(retVal);
    }
}
