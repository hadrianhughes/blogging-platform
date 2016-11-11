import React from 'react';
import ReactDOM from 'react-dom';

import Archive from './Archive/Archive';

var archiveApp = document.getElementById('archiveApp');
if(archiveApp)
{
    ReactDOM.render(<Archive />, archiveApp);
}
