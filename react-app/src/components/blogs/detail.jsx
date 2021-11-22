import React, { Component } from "react";
import Moment from 'react-moment';
import CommentContainer from "../comments/commentContainer";
import { retrieveBlog } from '../../store/blog/slice';
import { retrieveComments } from '../../store/comment/slice';
import { connect } from 'react-redux';
import { Loader } from '../loader';
class Blog extends Component {

    componentDidMount() {
        let Url = new URL(window.location.href);
        this._id = Url.searchParams.get('id');
        let parsedPath = Url.pathname.split("/");
        this._slug = parsedPath.pop();
        if (this._id) {
            this.props.retrieveBlog(this._id);
            this.props.retrieveComments(this._id);
        }
    }

    render() {

        let currentBlog = this.props.blog;

        if (this.props.loading === true) {
            return (
                <section id="blog" className="blog">
                    <div className="container aos-init aos-animate" data-aos="fade-up">
                        <div className="row">
                            <div className="col-lg-12 entries">
                                <Loader style={ { position: 'relative', minHeight: '500px' } } />
                            </div>
                        </div>
                    </div>
                </section>
            );
        }

        return (
            <section id="blog" className="blog">
                <div className="container aos-init aos-animate" data-aos="fade-up">
                    <div className="row">
                        <div className="col-lg-12 entries">

                            <article className="entry entry-single">

                                <h2 className="entry-title">
                                    <a href="blog-single.html">{ currentBlog.title }</a>
                                </h2>
                                <div className="entry-meta">
                                    <ul>
                                        <li className="d-flex align-items-center"><i className="bi bi-person" /> <button className="anchor-style">{ currentBlog.author?.username }</button></li>
                                        <li className="d-flex align-items-center">
                                            <i className="bi bi-clock" />
                                            <button className="anchor-style">
                                                <time dateTime="2020-01-01"> <Moment format="MMM D, YYYY" date={ currentBlog.date } /></time>
                                            </button>
                                        </li>
                                        { currentBlog.comments?.length > 0 && <li className="d-flex align-items-center"><i className="bi bi-chat-dots" /> <button className="anchor-style">{ currentBlog.comments?.length } Comments</button></li> }
                                    </ul>
                                </div>
                                <div className="entry-content" dangerouslySetInnerHTML={ { __html: currentBlog.content } }>
                                </div>
                            </article>

                            { currentBlog.slug && <CommentContainer { ...this.props } /> }

                        </div>

                    </div>
                </div>
            </section>

        );

    }

}

const mapStateToProps = (state) => {
    let { loading, blog } = state.blogReducer;
    let { comments, currentComment, count } = state.commentReducer;
    return { loading, blog, comments, currentComment, count };
};


export default connect(mapStateToProps, { retrieveBlog, retrieveComments })(Blog);