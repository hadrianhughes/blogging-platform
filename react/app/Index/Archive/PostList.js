import React from 'react';

export default class PostList extends React.Component
{
    render()
    {
        let items = this.props.items.map((item) => <li key={item.id}><a href="#" onClick={this.props.onClick}>{item.title}</a></li>);

        return(
            <ul className="border" id="postList">{items}</ul>
        );
    }
}
