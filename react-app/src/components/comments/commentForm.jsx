import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { addComment, actions } from '../../store/comment/slice';
import { actions as commoonActions } from '../../store/comment/slice';
import { Loader } from "../loader";
class CommentForm extends Component {

    onChange = (e) => {
        this.props.updateCommentState({ key: e.target.name, value: e.target.value });
    };

    componentDidMount() {
        this._url = new URL(window.location.href);
        if (this._url && !this.props.currentUser) {
            this.props.UpdateState({ key: 'redirectTo', value: this._url.pathname + this._url.search });
        }
    }

    handleSubmit = (ev) => {

        ev.preventDefault();

        if (!this.props.currentUser) {
            if (!this.props.userData.email) {
                this.props.updateErrorState({ key: 'email', value: 'Email is required' });
            }

            if (!this.props.userData.username) {
                this.props.updateErrorState({ key: 'username', value: 'Username is required' });
            }

            if (!this.props.userData.email || !this.props.userData.username) {
                return false;
            }
        }

        if (!this.props.currentComment.content) {
            this.props.updateErrorState({ key: 'content', value: 'Empty comment is not allowed' });
        }

        if (!this.props.currentComment.content) {
            return false;
        }

        this.props.addComment({ slug: this.props.blog.slug, id: this.props.blog._id, comment: this.props.currentComment });



    };

    render() {

        if (this.props.loading) {
            return (
                <Loader style={ { position: 'relative', height: '90px' } } />
            );
        }

        if (!this.props.currentUser) {
            return (
                <div className="reply-form"><Link to="/login" >Login</Link> / <Link to={ `/register` }>Sign up</Link> to comment or reply</div >
            );
        }
        return (
            <div className="reply-form">
                <h4>Add a Comment</h4>
                <form onSubmit={ this.handleSubmit }>
                    <div className="row">
                        <div className="col form-group">
                            <textarea name="content" className="form-control" placeholder="Your Comment*" value={ this.props.currentComment?.content || "" } onChange={ e => this.onChange(e) } />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        );
    }

}

const mapStateToProps = (state) => {
    let { loading, currentComment } = state.commentReducer;
    let { currentUser } = state.commonReducer;
    let { blog } = state.blogReducer;
    return { loading, currentUser, currentComment, blog };
};


export default connect(mapStateToProps,
    {
        addComment,
        updateCommentState: actions.updateCommentState,
        updateErrorState: actions.updateErrorState,
        UpdateState: commoonActions.updateState
    }
)(CommentForm);