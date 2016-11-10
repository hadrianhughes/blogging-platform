import React from 'react';

import Form from './Form';
import ResultsList from './ResultsList';

export default class SearchBox extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { results: [] };
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(value)
    {
        console.log(value);
    }
    
    render()
    {
        return(
            <div>
                <Form onSubmit={(value) => this.handleSubmit(value)} />
                <ResultsList results={this.state.results} />
            </div>
        );
    }
}
