import React from 'react';

export default class BlogInfo extends React.Component
{
    render()
    {
        let retVal;
        if(this.props.open)
        {
            retVal = <div id="mobBlogInfo" className="open">
                <div>
                    <img src={this.props.photo} id="mobPhoto" />
                    <div id="mobBio">
                        {this.props.bio}
                    </div>
                </div>
            </div>;
        }
        else if(this.props.closed)
        {
            retVal = <div id="mobBlogInfo" className="closed">
                <div>
                    <img src={this.props.photo} id="mobPhoto" />
                    <div id="mobBio">
                        {this.props.bio}
                    </div>
                </div>
            </div>;
        }
        else
        {
            retVal = <div id="mobBlogInfo">
                <div>
                    <img src={this.props.photo} id="mobPhoto" />
                    <div id="mobBio">
                        {this.props.bio}
                    </div>
                </div>
            </div>;
        }
        
        return retVal;
    }
}
