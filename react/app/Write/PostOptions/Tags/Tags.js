import React from 'react';

import Input from './Input';
import TagList from './TagList';

export default class Tags extends React.Component
{
    render()
    {
        return(
            <div>
                <h3>Tags</h3>
                <Input value={this.props.inputValue} onChange={this.props.onChange} />
                <TagList items={this.props.tags} onDelete={(id) => this.props.onDelete(id)} />
            </div>
        );
    }
}
