import React from 'react';
import ReactDOM from 'react-dom';

import Index from './Index/Index';
import Write from './Write/Write';

class App extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { isIndex: true, isWrite: false };
        
        this.changeToWrite = this.changeToWrite.bind(this);
    }
    
    changeToWrite()
    {
        this.setState({ isIndex: false, isWrite: true });
    }
    
    render()
    {
        return(
            <div>
                {this.state.isIndex ? <Index onChangePage={this.changeToWrite} /> : null}
                {this.state.isWrite ? <Write /> : null}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
