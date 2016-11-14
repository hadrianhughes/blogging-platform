import React from 'react';

export default class TagList extends React.Component
{
    constructor()
    {
        super();
        
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(e)
    {
        this.props.onDelete(e.target.id);
    }
    
    render()
    {
        let tags = this.props.items.map((item) => <div key={item.id} id={"tag-" + item.id} className="button tag clickable" onClick={this.handleClick}>{item.value}</div>);

        return(
            <div>
                {tags}
            </div>
        );
    }
}
