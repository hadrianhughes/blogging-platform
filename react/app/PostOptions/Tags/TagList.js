import React from 'react';

export default class TagList extends React.Component
{
    render()
    {
        let tags = this.props.items.map((item) => <div key={item.id} className="tag">{item.value}</div>);

        return(
            <div>
                {tags}
            </div>
        );
    }
}
