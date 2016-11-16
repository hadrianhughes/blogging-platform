import React from 'react';

import Archive from './Archive/Archive';
import Article from './Article/Article';

export default class Index extends React.Component
{
    
    
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
                            <Article />
                        </td>
                        <td className="content-to-top center-text smaller-padding" id="archive-container">
                            <div id="archive">
                                <Archive />
                            </div>
                            <div className="footer">
                                <button className="button" onClick={this.props.onPageChange}>Write an article</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
