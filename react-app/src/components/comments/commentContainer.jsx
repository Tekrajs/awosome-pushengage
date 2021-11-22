import React from "react";
import CommentForm from "./commentForm";
import CommentList from "./commentLists";

const CommentContainer = (props) => {

    return (
        <div className="blog-comments">
            <h4 className="comments-count">{ props.count } Comments</h4>

            <CommentForm />

            <CommentList { ...props } />

        </div>

    );

};

export default CommentContainer;