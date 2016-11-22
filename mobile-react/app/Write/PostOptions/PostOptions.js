import React from 'react';

import Banner from './Banner';

export default class PostOptions extends React.Component
{
    render()
    {
        return(
            <Banner banner={this.props.banner} onSubmit={(url) => this.props.onBannerSubmit(url)} />
        );
    }
}
