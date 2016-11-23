import React from 'react';

export default class OptionList extends React.Component
{
    render()
    {
        let list = this.props.items.map((item) => <li key={item.id}><a href="#" onClick={this.props.onClick}>{item.value}</a></li>);

        //Only render list items if the list is active
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
