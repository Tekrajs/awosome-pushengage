import React from "react";
import Comments from "./comments";

const commentThreader = (blogComments) => {

    let comments = [];
    for (let comment of Object.values(blogComments)) {
        comments.push(<Comments
            comment={ comment }
            key={ comment._id }
        />);
        if (comment.children && Object.keys(comment.children).length > 0) {
            let replies = commentThreader(comment.children);
            comments = comments.concat(replies);
        }
    }
    return comments;
};

const CommentList = (props) => {

    const comments = commentThreader(props.comments);

    return (

        <React.Fragment>
            {
                comments
            }
        </React.Fragment>

    );

};

export default CommentList;