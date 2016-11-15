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
                <Banner banner={this.props.banner} onSubmit={(url) => this.props.onSubmitBanner(url)} />
                <Tags tags={this.props.tags} inputValue={this.props.tagInputValue} onChange={this.props.onChangeTagInput} onDelete={(id) => this.props.onDeleteTag(id)} />
                <Comments allowComments={this.props.allowComments} allowProfanity={this.props.allowProfanity} limit={this.props.limit} onToggleComments={this.props.onToggleComments} onToggleProfanity={this.props.onToggleProfanity} onToggleLimit={this.props.onToggleLimit} onNumChange={this.props.onNumChange} />
            </div>
        );
    }
}
