import React, { Component } from "react";
import { Post as ApiPost } from "../api/post";

interface PostProps {
    post: ApiPost;
}

export default class Post extends Component<PostProps, object> {
    render() {
        return (
            <div className="bg-white p-4">
                <h3>{this.props.post.title}</h3>
                <img src={this.props.post.imageUrl} />
            </div>
        );
    }
}
