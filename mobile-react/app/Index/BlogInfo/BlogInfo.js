import React from 'react';

export default class BlogInfo extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { editingPhoto: false, editingBio: false };
        
        this.handlePhotoClick = this.handlePhotoClick.bind(this);
        this.handleBioClick = this.handleBioClick.bind(this);
        this.updateBio = this.updateBio.bind(this);
    }
    
    handlePhotoClick()
    {
        if(!this.state.editingPhoto)
        {
            this.setState({ editingPhoto: true });
        }
    }
    
    handleBioClick()
    {
        if(!this.state.editingBio)
        {
            this.setState({ editingBio: true });
        }
    }
    
    updateBio()
    {
        this.setState({ editingBio: false });
        this.props.onUpdateBio();
    }
    
    render()
    {
        let loggedInClass = '';
        if(this.props.loggedIn)
        {
            loggedInClass = 'logged-in-mobile';
        }
        
        let openClass = '';
        if(this.props.open)
        {
            openClass = 'open';
        }
        else if(this.props.closed)
        {
            openClass = 'closed';
        }
        
        return(<div id="mobBlogInfo" className={openClass}>
                <div>
                    <img src={this.props.photo} id="mobPhoto" className={loggedInClass + ' margin-bottom'} onClick={this.props.onPhotoClick} />
                    <div id="mobBio" className={loggedInClass + ' mobile-font-size'} onClick={this.handleBioClick}>
                        {this.state.editingBio ? <textarea id="bio-input" value={this.props.bio} className="mobile-font-size" onChange={this.props.onChangeBio} /> : <p>{this.props.bio}</p>}
                    </div>
                    {this.state.editingBio ? <button className="button margin-top" onClick={this.updateBio}>Update</button> : null}
                </div>
            </div>);
    }
}
