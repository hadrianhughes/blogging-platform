import React from 'react';

export default class Image extends React.Component
{
    render()
    {
        let retVal;
        if(this.props.src.length > 0)
        {
            retVal = <img src={this.props.src} id="imgBanner" />
        }
        else
        {
            retVal = null;
        }
        
        return retVal;
    }
}
