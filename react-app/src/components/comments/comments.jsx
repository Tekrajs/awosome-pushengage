import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addComment } from "../../store/comment/slice";
class Comments extends Component {

    constructor (props) {
        super(props);
        this.state = {
            is_replying: false,
            comment: {}
        };
    }

    isReplying = (e) => {
        let { id, depth } = e.target.dataset;
        this.setState(
            {
                is_replying: !this.state.is_replying,
                comment: { ...this.state.comment, parentId: id, depth: (parseInt(depth) + 1) }
            }
        );
    };

    onChange = (e) => {
        this.setState({
            comment: { ...this.state.comment, [e.target.name]: e.target.value }
        });
    };

    submitReply = (e) => {
        this.props.addComment({ slug: this.props.blog.slug, id: this.props.blog._id, comment: this.state.comment });
        this.setState({ is_replying: !this.state.is_replying, comment: {} });
    };

    handleCancel = (e) => {
        this.setState({
            is_replying: false,
            comment: {}
        });
    };

    render() {

        const comment = this.props.comment;
        const calculatedMargin = (parseInt(comment.depth) - 1) * 30;

        return (
            <React.Fragment>

                <div style={ { marginLeft: calculatedMargin + 'px' } } id="comment-1" className={ "comment" + (comment.depth > 1 ? " comment-reply comment__reply__1" : '') } >
                    <div className="d-flex">
                        <div className="comment-img"><img src="https://via.placeholder.com/60x60" alt="test" /></div>
                        <div className="comment-holder">
                            <h5>
                                <button className="anchor-style">{ comment.author.username }</button>
                                <button
                                    disabled={ !this.props.currentUser }
                                    data-id={ comment._id }
                                    data-depth={ comment.depth }
                                    data-parent_id={ comment.parentId }
                                    className="reply anchor-style" onClick={ e => this.isReplying(e) }>
                                    <i className="bi bi-reply-fill" />
                                    Reply
                                </button>
                            </h5>
                            <Moment date={ comment.publishDate } format="MMM D, YYYY" />
                            <p>
                                { comment.content }
                            </p>
                            { this.state.is_replying &&
                                <div>
                                    <input className="thread-reply" type="text" name="content" onChange={ e => this.onChange(e) } value={ this.state.comment.content || '' } />
                                    <div className="reply-action-handler">
                                        <button disabled={ !this.props.currentUser } onClick={ (e) => this.submitReply(e) }>Reply</button>
                                        <button onClick={ e => this.handleCancel(e) }>Cancel</button></div>
                                </div> }
                        </div>
                    </div>
                </div>

            </React.Fragment >
        );
    }

};

const mapStateToProps = (state) => {
    let { blog } = state.blogReducer;
    let { currentUser } = state.commonReducer;
    return { blog, currentUser };
};

export default connect(mapStateToProps, { addComment })(Comments);