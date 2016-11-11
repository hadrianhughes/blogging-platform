import React from 'react';
import ReactDOM from 'react-dom';

import Archive from './Archive/Archive';

//Add all elements and apps to this array
let elementList = [{ element: 'archiveApp', component: <Archive /> }];

for(let i = 0;i < elementList.length;i++)
{
    let element = document.getElementById(elementList[i].element);
    if(element)
    {
        ReactDOM.render(elementList[i].component, element);
    }
}
