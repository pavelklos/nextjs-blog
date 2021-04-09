// rfce
// 1.) Hero => Present ourselves
// 2.) Featured Posts
import { Fragment } from "react";
import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";

function HomePage() {
  return (
    <Fragment>
      <h1>Home Page</h1>
      <Hero />
      <FeaturedPosts />
    </Fragment>
  );
}

export default HomePage;
