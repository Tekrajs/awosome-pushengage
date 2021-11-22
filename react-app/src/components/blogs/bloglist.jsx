import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { retrieveBlogs, actions, createBlog } from '../../store/blog/slice';
import BlogPreview from './blogPreview';
import { Loader } from '../loader';
import Modal from '../Model';
class BlogList extends Component {

    constructor (props) {
        super(props);
        this._isMounted = false;
    }

    componentDidMount() {
        if (!this._isMounted) {
            this._isMounted = true;
        }
        this.props.setLoading();
        this.props.retrieveBlogs();
    }

    modelToggle = () => {
        if (this._isMounted) {
            this.props.updateState({
                key: 'show_model', value: !this.props.show_model
            });
        }
    };

    onChange = (e) => {
        this.props.updateBlogState({ key: e.target.name, value: e.target.value });

    };

    handleSubmit = () => {

        let { title, content, date } = this.props.blog;
        if (!title) {
            this.props.updateErrorState({ key: 'title', value: 'title cannot be empty' });
        }
        if (!content) {
            this.props.updateErrorState({ key: 'content', value: 'content cannot be empty' });
        }
        if (!date) {
            this.props.updateErrorState({ key: 'date', value: 'date cannot be empty' });
        }

        if (!content || !title || !date) {
            return false;
        }

        this.props.createBlog({ ...this.props.blog });

    };

    render() {

        return (
            <div className="container mt-100 mt-60">
                <div className="row">
                    <div className="col-12 text-center">
                        <div className="section-title mb-4 pb-2">
                            <h4 className="title mb-4">Awosome motive latest Blog &amp; News</h4>
                            <p className="text-muted para-desc mx-auto mb-0">Be updated with awosome motive latest updates</p>
                        </div>
                        <div className="mb-4 pb-2">
                            {
                                this.props.currentUser
                                    ? <button className="btn btn-primary" onClick={ (e) => this.modelToggle(e) }>Add New Post</button>
                                    : <p> <Link to="/login" >Login</Link> / <Link to="/register">Sign up</Link> to create blog posts</p>
                            }

                        </div>
                    </div>
                </div>

                <div className="row">
                    { this.props.loading
                        ? <Loader />
                        : <BlogPreview { ...this.props } />
                    }
                </div>

                { this.props.show_model
                    && <Modal
                        errors={ this.props.errors }
                        onChange={ this.onChange }
                        modelToggle={ this.modelToggle }
                        handleSubmit={ this.handleSubmit } />
                }
            </div >

        );
    }
};

const mapStateToProps = (state) => {
    let { loading, blog, blogs, errors, show_model } = state.blogReducer;

    return {
        loading,
        blog,
        blogs,
        errors,
        show_model,
        currentUser: state.commonReducer.currentUser,
    };
};
export default connect(mapStateToProps,
    {
        retrieveBlogs,
        setLoading: actions.setLoading,
        createBlog,
        updateState: actions.updateState,
        updateBlogState: actions.updateBlogState,
        updateErrorState: actions.updateErrorState
    }
)(BlogList);