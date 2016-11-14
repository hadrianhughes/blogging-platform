import React from 'react';

import Tags from './Tags/Tags';
import Comments from './Comments/Comments';

export default class PostOptions extends React.Component
{
    render()
    {
        return(
            <div>
                <Tags />
                <Comments />
            </div>
        );
    }
}
