import React from 'react';

import Button from './Button';
import NumInput from './NumInput';

export default class Comments extends React.Component
{
    render()
    {
        return(
            <div className="margin-bottom">
                <h1>Comments</h1>
                <Button value="Allow comments" active={this.props.allowComments} onClick={this.props.onToggleComments} />
                <Button value="Allow profanity" active={this.props.allowProfanity} onClick={this.props.onToggleProfanity} />
                <div>
                    <Button value="Limit length" active={this.props.limit} onClick={this.props.onToggleLimit} />
                    {this.props.limit ? <NumInput onChange={this.props.onNumChange} /> : null}
                </div>
            </div>
        );
    }
}
