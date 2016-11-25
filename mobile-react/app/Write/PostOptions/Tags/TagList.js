import React from 'react';

export default class TagList extends React.Component
{
    render()
    {
        let tags = this.props.items.map((item) => <div key={item.id} id={"tag-" + item.id} className="button tag clickable mobile-font-size" onClick={this.handleClick}>{item.value}</div>);
        
        return(
            <div>
                {tags}
            </div>
        );
    }
}
