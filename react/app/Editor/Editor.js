import React from 'react';

import Title from './Title';
import Article from './Article/Article';

export default class Editor extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { title: '' };
        
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e)
    {
        this.setState({ title: e.target.value });
    }
    
    render()
    {
        return(
            <div>
                <Title onChange={this.handleChange} />
                <br />
                <Article title={this.state.title} />
            </div>
        );
    }
}
