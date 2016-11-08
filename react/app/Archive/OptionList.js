import React from 'react';

export default class OptionList extends React.Component
{
    render()
    {
        let list = this.props.items.map((item) => <li key={item.id}>{item.value}</li>);
        
        return(
            <ul>
                {list}
            </ul>
        );
    }
}
