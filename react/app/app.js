import React from 'react';
import ReactDOM from 'react-dom';

import Archive from './Archive/Archive';
import PostOptions from './PostOptions/PostOptions';
import Editor from './Editor/Editor';

//Add all elements and apps to this array
let elementList = [{ element: 'archiveApp', component: <Archive /> }, { element: 'postOptionsApp', component: <PostOptions /> }, { element: 'editorApp', component: <Editor /> }];

for(let i = 0;i < elementList.length;i++)
{
    let element = document.getElementById(elementList[i].element);
    if(element)
    {
        ReactDOM.render(elementList[i].component, element);
    }
}
