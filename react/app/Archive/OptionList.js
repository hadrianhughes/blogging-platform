import React from 'react';

export default class OptionList extends React.Component
{
    constructor()
    {
        super();
        
        this.makeMonth = this.makeMonth.bind(this);
    }
    
    makeMonth(month, year)
    {
        var possibleMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        var retMonth = possibleMonths[month - 1];
        
        return retMonth + ' ' + year;
    }
    
    render()
    {
        let list = this.props.items.map((item) => <li key={item.id}><a href="#" onClick={this.props.onClick}>{this.makeMonth(item.month, item.year)}</a></li>);

        let retVal;
        if(this.props.active)
        {
            retVal = <ul className="active border" id="monthList">{list}</ul>
        }
        else
        {
            retVal = <ul id="monthList"></ul>
        }

        return(retVal);
    }
}
