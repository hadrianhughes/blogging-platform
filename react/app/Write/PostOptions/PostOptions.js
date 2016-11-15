import React from 'react';

import Tags from './Tags/Tags';
import Comments from './Comments/Comments';
import Banner from './Banner/Banner';

export default class PostOptions extends React.Component
{
    render()
    {
        return(
            <div>
                <Banner />
                <Tags />
                <Comments />
            </div>
        );
    }
}
