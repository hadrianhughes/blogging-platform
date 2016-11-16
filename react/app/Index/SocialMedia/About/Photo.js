import React from 'react';

export default class Photo extends React.Component
{
    render()
    {
        return(
            <div className="larger-padding center-text" id="photo">
                <img src="http://placehold.it/300x300" />
            </div>
        );
    }
}
