import React from 'react';

import Input from './Input';
import TagList from './TagList';

export default class Tags extends React.Component
{
    constructor()
    {
        super();

        this.state = { tags: [], inputValue: '' };

        this.handleChange = this.handleChange.bind(this);
        this.addKeys = this.addKeys.bind(this);
    }

    handleChange(e)
    {
        const input = e.target.value;

        if(input[input.length - 1] == ',')
        {
            let tag = {};
            tag.value = e.target.value.substring(0, e.target.value.length - 1);

            let tagContainer = this.state.tags;
            tagContainer.push(tag);
            this.setState({ tags: tagContainer, inputValue: '' });
        }
        else
        {
            this.setState({ inputValue: input });
        }
    }

    addKeys(set)
    {
        let counter = 0;

        //For each item in the set
        let retSet = set.map(function(item)
        {
            //Give it an id value equal to counter
            counter++;
            item.id = counter;
            return item;
        });

        return retSet;
    }

    render()
    {
        let tags = this.addKeys(this.state.tags);

        return(
            <div>
                <h3>Tags</h3>
                <Input value={this.state.inputValue} onChange={this.handleChange} />
                <TagList items={tags} />
            </div>
        );
    }
}
