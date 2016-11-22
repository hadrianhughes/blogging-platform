import React from 'react';
import ReactDOM from 'react-dom';

import Index from './Index/Index';

class App extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { isIndex: true };
    }
    
    render()
    {
        return(
            <div>
                {this.state.isIndex ? <Index /> : null}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
