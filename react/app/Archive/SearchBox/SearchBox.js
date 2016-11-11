import React from 'react';

import Form from './Form';
import ResultsList from './ResultsList';

export default class SearchBox extends React.Component
{
    render()
    {
        return(
            <div>
                <Form active={this.props.active} onSubmit={(value) => this.props.onSubmit(value)} />
                <ResultsList items={this.props.results} active={this.props.active} />
            </div>
        );
    }
}
