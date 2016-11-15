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
        this.changeToIndex = this.changeToIndex.bind(this);
    }
    
    changeToWrite()
    {
        this.setState({ isIndex: false, isWrite: true });
    }
    
    changeToIndex()
    {
        this.setState({ isIndex: true, isWrite: false });
    }
    
    render()
    {
        return(
            <div>
                {this.state.isIndex ? <Index onPageChange={this.changeToWrite} /> : null}
                {this.state.isWrite ? <Write onPageChange={this.changeToIndex} /> : null}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
