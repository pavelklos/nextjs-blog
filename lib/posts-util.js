import fs from "fs";
import path from "path";
import matter from "gray-matter";

// create absolute path to folder 'posts'
// process.cwd() : absolute path to project folder
const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, ""); // removes the file extension

  // create absolute path to file in folder 'posts'
  const filePath = path.join(postsDirectory, `${postSlug}.md`); // file is '.md'
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    content: content,
  };

  return postData;
}

export function getAllPosts() {
  // const postFiles = fs.readdirSync(postsDirectory); // array of strings (file names)
  const postFiles = getPostsFiles(); // array of strings (file names)

  // for (const postFile of postFiles) {
  //   const postData = getPostData(postFile);
  // }
  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}
