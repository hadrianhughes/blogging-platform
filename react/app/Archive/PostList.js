import React from 'react';

export default class PostList extends React.Component
{
    render()
    {
        let items = this.props.items.map((item) => <li key={item.id}>{item.name}</li>);
        
        return(
            <ul>{items}</ul>
        );
    }
}
