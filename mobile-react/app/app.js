import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component
{
    render()
    {
        return(
            <p>Lorem ipsum dolor sit amet</p>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
