import React from 'react';

import Archive from './Archive/Archive';
import Article from './Article/Article';

export default class Index extends React.Component
{
    constructor()
    {
        super();
        
        this.state = { id: '', banner: '', title: '', content: '', comments: [] };
    }
    
    componentDidMount()
    {
        $.get('/loadPost', function(data)
        {
            this.setState({ id: data._id, banner: data.banner, title: data.title, content: data.content, comments: data.comments });
        }.bind(this));
    }
    
    render()
    {
        return(
            <table id="layout-table">
                <tbody>
                    <tr id="body">
                        <td className="content-to-top" id="social-media-container">
                            <div className="larger-padding" id="about">
                                <div className="larger-padding center-text" id="photo">
                                    <img src="http://placehold.it/300x300" />
                                </div>
                                <div id="bio">
                                    Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                                </div>
                            </div>
                            <div className="center-text center footer maxWidth">
                                <div className="center center-text">
                                    <button>Twitter</button><button>Facebook</button><button>Instagram</button>
                                </div>
                                Powered by [CMS name]
                            </div>
                        </td>
                        <td className="content-to-top" id="content-container">
                            <Article banner={this.state.banner} title={this.state.title} content={this.state.content} />
                        </td>
                        <td className="content-to-top center-text smaller-padding" id="archive-container">
                            <div id="archive">
                                <Archive postId={this.state.id} comments={this.state.comments} />
                            </div>
                            <div className="footer">
                                <button id="btnChangePage" className="button" onClick={this.props.onPageChange}>Write an article</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
