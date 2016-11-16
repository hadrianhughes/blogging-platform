import React from 'react';

export default class Bio extends React.Component
{
    render()
    {
        return(
            <div>
                <div className="logged-in" id="bio" onClick={this.props.editing ? null : this.props.onClick}>
                    {this.props.editing ? <textarea id="bio-input" value={this.props.value} onChange={this.props.onChange} /> : <p>{this.props.value}</p>}
                </div>
                {this.props.editing ? <button className="button" onClick={this.props.editing ? this.props.onClick : null}>Update</button> : null}
            </div>
        );
    }
}
