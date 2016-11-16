import React from 'react';

import Photo from './Photo';
import Bio from './Bio';

export default class About extends React.Component
{
    render()
    {
        return(
            <div className="larger-padding" id="about">
                <Photo />
                <Bio />
            </div>
        );
    }
}
