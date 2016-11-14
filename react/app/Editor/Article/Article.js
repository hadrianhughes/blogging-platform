import React from 'react';

import Button from './Button';

export default class Article extends React.Component
{
    render()
    {
        return(
            <div id="editorMain">
                <h1 id="articleTitle">{this.props.title}</h1>
                <div>
                    <Button text="B" />
                    <Button text="U" />
                    <Button text="I" />
                </div>
                <div id="documentContainer" contentEditable>
                </div>
            </div>
        );
    }
}
