import React from 'react';

import Banner from './Banner';
import Tags from './Tags/Tags';
import Comments from './Comments/Comments';

export default class PostOptions extends React.Component
{
    render()
    {
        return(
            <div>
                <Banner banner={this.props.banner} onSubmit={(url) => this.props.onSubmitBanner(url)} />
                <Tags tags={this.props.tags} tagValue={this.props.tagValue} onChangeTag={this.props.onChangeTag} onDelete={(id) => this.props.onDeleteTag(id)} />
                <Comments allowComments={this.props.allowComments} allowProfanity={this.props.allowProfanity} limit={this.props.limit} onToggleComments={this.props.onToggleComments} onToggleProfanity={this.props.onToggleProfanity} onToggleLimit={this.props.onToggleLimit} onNumChange={this.props.onNumChange} />
            </div>
        );
    }
}
