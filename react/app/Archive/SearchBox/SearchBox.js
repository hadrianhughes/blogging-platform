import React from 'react';

import Form from './Form';
/*import ResultsList from './ResultsList';*/

export default class SearchBox extends React.Component
{
    constructor()
    {
        super();
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit()
    {
        console.log('submitted');
    }
    
    render()
    {
        return(
            <Form onSubmit={this.handleSubmit} />
            /*<ResultsList />*/
        );
    }
}
