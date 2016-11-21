import React from 'react';

export default class BlogInfo extends React.Component
{
    render()
    {
        return(
            <div id="mobBlogInfo">
                <img src={this.props.photo} id="mobPhoto" />
                <div id="mobBio">
                    {this.props.bio}
                </div>
            </div>
        );
    }
}
