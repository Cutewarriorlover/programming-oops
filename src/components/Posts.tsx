import React, { Component, createRef, RefObject } from "react";
import { convertToPost, getPosts } from "../api/redditApi";
import { Post as ApiPost } from "../api/post";
import Post from "./Post";

interface PostsState {
    posts: ApiPost[];
    after: string;
}

export default class Posts extends Component<object, PostsState> {
    constructor(props: object) {
        super(props);

        this.state = { posts: [], after: "" };

        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        getPosts().then((data) => {
            this.setState({ after: data["after"] });
            console.log(data)

            for (const post of data["posts"]) {
                if (post["data"]["post_hint"] == "image") {
                    this.setState({
                        posts: this.state.posts.concat(
                            convertToPost(post["data"])
                        ),
                    });
                }
            }
        });

        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll() {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight
        )
            return;
        console.log(this.state.after);
        getPosts(this.state.after).then((data) => {
            this.setState({ after: data["after"] });

            for (const post of data["posts"]) {
                if (post["data"]["post_hint"] == "image") {
                    this.setState({
                        posts: this.state.posts.concat(
                            convertToPost(post["data"])
                        ),
                    });
                }
            }
        });
    }

    render() {
        return (
            <div className="flex flex-col w-3/4 lg:w-1/2 mx-auto space-y-4">
                {this.state.posts.map((post, idx) => (
                    <Post post={post} key={idx} />
                ))}
            </div>
        );
    }
}
