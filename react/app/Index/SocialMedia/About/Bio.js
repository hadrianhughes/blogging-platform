import React from 'react';

export default class Bio extends React.Component
{
    render()
    {
        let divClass = "";
        if(this.props.loggedIn)
        {
            divClass = "logged-in";
        }
        
        return(
            <div>
                <div className={divClass} id="bio" onClick={this.props.editing ? null : () => this.props.onClick(this.props.loggedIn)}>
                    {this.props.editing ? <textarea id="bio-input" value={this.props.value} onChange={this.props.onChange} /> : <p>{this.props.value}</p>}
                </div>
                {this.props.editing ? <button className="button" onClick={this.props.editing ? this.props.onClick : null}>Update</button> : null}
            </div>
        );
    }
}
