import React from 'react';

export default class Form extends React.Component
{
    render()
    {
        return(
            <form>
                <input id="searchInput" className="textInput" type="text" />
                <input className="button" type="button" onClick={this.props.onSubmit} value="Search" />
            </form>
        );
    }
}
