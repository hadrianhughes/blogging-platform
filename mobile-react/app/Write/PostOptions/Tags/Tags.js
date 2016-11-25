import React from 'react';

import Input from './Input';
import TagList from './TagList';

export default class Tags extends React.Component
{
    render()
    {
        return(
            <div className="margin-bottom">
                <h1>Tags</h1>
                <Input value={this.props.tagValue} onChange={this.props.onChangeTag} />
                <TagList items={this.props.tags} />
            </div>
        );
    }
}
