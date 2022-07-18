import React from "react";
import { Link } from "react-router-dom";

const PostList = ({ postId, title, author, avatar, summary }) => {
    return (
        <div className="card">
            <div className="card-details">
                <h3>{title}</h3>
                <p>{summary}</p>
                <div className="author-details">
                    <h5>{author}</h5>
                    <img src={avatar} alt="avatar" className="avatar" />
                </div>
                <Link to={"/" + postId} className="read-more">Read More</Link>
            </div>
        </div>
    )
}

export default PostList;