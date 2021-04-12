// rfce
import Head from "next/head";
import { Fragment } from "react";
import PostContent from "../../components/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-util";

function PostDetailPage(props) {
  // console.log(props.post);

  // return <PostContent />;
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name='description' content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />;
    </Fragment>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;
  // console.log(slug);

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600, // 600 sec = 10 min
  };
}

export function getStaticPaths() {
  const postFileNames = getPostsFiles();
  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ""));
  // console.log(slugs);

  return {
    // paths: [{ params: { slug: "getting-started-with-nextjs" } }],
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false, // true, 'blocking'
  };
}

export default PostDetailPage;
