import React from "react";
import { Link } from "react-router-dom";
import Moment from 'react-moment';

const BlogPreview = props => {

    const colors = ['FF7F50', '6495ED', 'FF1493'];
    if (props.blogs.length === 0) {
        return (
            <div className="col-12 mt-4 pt-2 justify-content-center text-center">
                Blogs Not available. you can start by creating
            </div>
        );
    }

    return (
        <React.Fragment>

            {
                props.blogs.map((blog, index) => {
                    let content = blog.content.replace(/(<([^>]+)>)/ig, '');
                    return (
                        <div key={ blog.slug } className="col-lg-4 col-md-6 mt-4 pt-2">
                            <div className="blog-post rounded border">
                                <div className="blog-img d-block overflow-hidden position-relative">
                                    <img src={ `https://via.placeholder.com/350x280/${colors[index % 3]}/000000` } className="img-fluid rounded-top" alt="test" />
                                    <div className="overlay rounded-top bg-dark" />
                                </div>
                                <div className="content p-3">
                                    <small className="text-muted p float-right">
                                        <Moment format="Do MMM, YYYY" date={ blog.date } />
                                    </small>
                                    {/* <small><Link to="/blog/1" className="text-primary">Marketing</Link></small> */ }
                                    <h4 className="mt-2"><Link to={ `/blog/${blog.slug}?id=${blog.id}` } className="text-dark title">{ blog.title }</Link></h4>
                                    <p className="text-muted mt-2">{ content.substr(1, 120) + '...' }</p>
                                </div>
                            </div>
                        </div>

                    );
                })
            }

        </React.Fragment>

    );

};

export default BlogPreview;