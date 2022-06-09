import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setBlogData } from "../../features/userSlice";
import axios from "axios";

const Blog = () => {
  const searchInput = useSelector(selectUserInput);
  const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=d094323b3a9be9ceefa15d6a82a06963`;

  //  dispatch and get the data we're getting from the api end point into our redux
  const dispatch = useDispatch();
  // set the dispatch into the componet useState
  const [blogs, setBlogs] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(blog_url)
      .then((response) => {
        dispatch(setBlogData(response.data));
        setBlogs(response.data);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    //  [] Will run only when the searchInput has changed
  }, [searchInput]);

  return (
    <div className="blog__page">
      <h1 className="blog__page__header">Blog</h1>
      {loading ? <h1 className="loading">Loading ...</h1> : ""}
      <div className="blogs">
        {blogs?.articles?.map((blog) => (
          <a className="blog" target="_blank" href={blog.url}>
            <img src={blog.image} alt="" />
            <div>
              <h3 className="sourceName">
                <span>{blog.source.name}</span>
                <p>{blog.PublishedAt}</p>
              </h3>
              <h1>{blog.title}</h1>
              <p>{blog.discription}</p>
            </div>
          </a>
        ))}

        {blogs?.totalArticles == 0 && (
          <h1 className="no__blogs">
            No Blogs Available - Search for something else
          </h1>
        )}
      </div>
    </div>
  );
};

export default Blog;
