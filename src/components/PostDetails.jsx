import React, { Component } from 'react'
import { getPosts } from '../services/Post';
import {Link} from "react-router-dom";

class PostDetails extends Component {
  state = {
    post: [],
    showPost: false,
  }

  componentDidMount = () => {
    let pathname = window.location.pathname;
    let postId = pathname.slice(1);
    getPosts().then(data => {
      let post = data.posts.filter(item => {
        return item.id === postId;
      })
      this.setState({ post: post });
      this.setState({ showPost: !this.state.showPost });
    }).catch(err => {
      console.log(err);
    });
  }

  render() {

    let postDetails = null;

    // let postDetails = this.state.showPost ? (
    //   <div>
    //     <h3>{this.state.post[0].title}</h3>
    //     <p>{this.state.post[0].summary}</p>
    //     <div className="author-details">
    //       <h5>{this.state.post[0].author.name}</h5>
    //       <img src={this.state.post[0].author.avatar} alt="avatar" className="avatar" />
    //     </div>
    //   </div>
    // ) : (
    //   <div>loading post details ...</div>
    // )

    if (this.state.showPost) {
      let post = this.state.post[0];
      let categories = post.categories.map(category => {
        return <span className="category" key={category.id}>{category.name}</span>
      });

      postDetails = (<>
        <h2>{this.state.post[0].title}</h2>
        <p>{this.state.post[0].summary}</p>
        <div className="category-list">{categories}</div>
        <div className="author-details">
          <h5>{this.state.post[0].author.name}</h5>
          <img src={this.state.post[0].author.avatar} alt="avatar" className="avatar" />
        </div>
      </>
      )

    } else {
      postDetails = <div className="loader-container">
        <div className="spinner"></div>
      </div>
    }

    return (
      <div className="container">
        <div className="row">
          <article className="post-details">
            {postDetails}
          <Link to={"/"} className="go-back">Go Back</Link>
          </article>
        </div>
      </div>
    )
  }
}


export default PostDetails;