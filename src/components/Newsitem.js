import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class Newsitem extends Component {
    render() {

        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;


        return (
            <div className="my-3 card-group ">

                <div className="card" >
                    <img className="card-img-top" src={!imageUrl ? "https://www.truepush.com/blog/wp-content/uploads/2021/03/read-more-plugin-featured-image.jpg" : imageUrl} alt="..." />
                    <div className="card-body ">



                        <h5 className="card-title">{title}...

                            <span class="position-absolute top-0 translate-middle badge rounded-pill bg-info" style={{left:'86%', zIndex:'1'}}>
                                {source}
                                <span class="visually-hidden">unread messages</span>
                            </span>

                        </h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-info">By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target={"_blank"} className="btn btn-sm btn-dark">Read more..</a>
                    </div>
                </div>

            </div >


        )
    }
}

export default Newsitem