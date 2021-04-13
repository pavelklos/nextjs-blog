// rfce
import ReactMarkdown from "react-markdown";
import Image from "next/image";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
// import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
// import darcula from "react-syntax-highlighter/dist/cjs/styles/prism/darcula";
// import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import PostHeader from "./post-header";
import classes from "./post-content.module.css";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);

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
              objectFit='cover'
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },
    code(code) {
      const { language, value } = code;
      return (
        <SyntaxHighlighter
          style={atomDark}
          // style={darcula}
          language={language}
          children={value}
        />
      );
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

// const DUMMY_POST = {
//   slug: "getting-started-with-nextjs",
//   title: "Getting Started with NextJS",
//   image: "getting-started-nextjs.png",
//   excerpt:
//     "NextJS is a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR.",
//   date: "2022-02-10",
//   content: "# This is a first post",
// };
