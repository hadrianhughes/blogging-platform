import React from 'react';

import Title from './Title';

export default class Editor extends React.Component
{
    render()
    {
        return(
            <div>
                <Title />
                <div ref="documentEdit" id="mobDocumentContainer" contentEditable></div>
            </div>
        );
    }
}
