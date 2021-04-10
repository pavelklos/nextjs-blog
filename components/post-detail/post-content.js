// rfce
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import PostHeader from "./post-header";
import classes from "./post-content.module.css";

function PostContent(props) {
  const { post } = props;
  // console.log(post);

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers = {
    // image(image) {
    //   return (
    //     <Image
    //       src={`/images/posts/${post.slug}/${image.src}`}
    //       alt={image.alt}
    //       width={600}
    //       height={300}
    //     />
    //   );
    // },
    paragraph(paragraph) {
      // if image is in paragraph [ERROR : ISSUE]
      const { node } = paragraph;
      if (node.children[0].type === "image") {
        const image = node.children[0];
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.url}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown renderers={customRenderers} className={classes.md}>
        {post.content}
      </ReactMarkdown>
    </article>
  );
  // const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;
  // return (
  //   <article className={classes.content}>
  //     <PostHeader title={DUMMY_POST.title} image={imagePath} />
  //     <ReactMarkdown className={classes.md}>{DUMMY_POST.content}</ReactMarkdown>
  //   </article>
  // );
}

export default PostContent;

const DUMMY_POST = {
  slug: "getting-started-with-nextjs",
  title: "Getting Started with NextJS",
  image: "getting-started-nextjs.png",
  excerpt:
    "NextJS is a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR.",
  date: "2022-02-10",
  content: "# This is a first post",
};
