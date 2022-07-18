import React, { Component } from "react";
import PostList from "./PostList";
import Select from "react-select";
import { getPosts } from "../services/Post";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

class Home extends Component {

    state = {
        posts: [],
        categories: [],
        nextPage: 5,
        pageSize: 5,
        displayLoader: false,
        showPost: false,
        disable: false,
        selectedOption: [],
    };

    componentDidMount = () => {
        console.log("component did mount")

        getPosts().then((data) => {
            this.setState({ posts: data.posts });
            let categories = new Set(data.posts.map(post => {
                return post.categories.map(category => {
                    return category.name;
                });
            }).flat(2));

            let categoryOption = [...categories].map(item => {
                return { value: item, label: item }
            });

            this.setState({ categories: categoryOption });
            this.setState({ showPost: true });

        }).catch((err) => {
            console.log(err);
        })

    }

    onTriggerLoadMore = () => {
        if (this.state.nextPage >= this.state.posts.length) {
            this.setState({ disable: true });
            toast.info("No more posts!", {
                position: toast.POSITION.TOP_RIGHT
            })
            console.log("No more posts");
            return
        }

        const nextPage = this.state.nextPage + this.state.pageSize;
        this.setState({ nextPage: nextPage })

    }

    handleSelectChange = (option) => {
        this.setState({ selectedOption: option })
    }

    render() {
        const listItem = this.state.posts;
        let postList = null;

        if (this.state.showPost) {
            postList = this.state.selectedOption.length > 0 ? (
                postList = this.state.selectedOption.map(value => {
                    let list = listItem.filter(post => {
                        return post.categories.some(el => el.name === value.value);
                    });
                    return list.map(post => {
                        return <PostList
                            key={post.id}
                            postId={post.id}
                            title={post.title}
                            author={post.author.name}
                            avatar={post.author.avatar}
                            summary={post.summary}
                        />
                    })
                })
            ) : (
                listItem.slice(0, this.state.nextPage).map(post => {
                    return <PostList
                        key={post.id}
                        postId={post.id}
                        title={post.title}
                        author={post.author.name}
                        avatar={post.author.avatar}
                        summary={post.summary}
                    />
                })
            )
        } else {
            postList = <div className="loader-container">
                <div className="spinner"></div>
            </div>
        }

        return (
            <div className="container">
                <div className="row">
                    <article className="post-list">
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleSelectChange}
                            options={this.state.categories}
                            isMulti={true}
                            isSearchable={true}
                        />
                        {postList}
                    </article>
                </div>
                <button disabled={this.state.disable} onClick={this.onTriggerLoadMore} className="load-more">Load More</button>
                <ToastContainer />
            </div>
        )
    }
}

export default Home;
