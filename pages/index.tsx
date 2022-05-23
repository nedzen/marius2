import { format, parseISO } from 'date-fns';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import { getAllPosts } from '../lib/api';
import { PostType } from '../types/post';

type IndexProps = {
  posts: PostType[];
};

export const Index = ({ posts }: IndexProps): JSX.Element => {
  return (
    <Layout>
      {posts.map((post) => (
        <article key={post.slug}>
          <p> {format(parseISO(post.date), 'MMMM dd, yyyy')}</p>
          <h1>
            <Link as={`/posts/${post.slug}`} href={`/posts/[slug]`}>
              <a className="text-gray-900 dark:text-white dark:hover:text-blue-400">
                {post.title}
              </a>
            </Link>
          </h1>
          <p>{post.description}</p>
          <Link as={`/posts/${post.slug}`} href={`/posts/[slug]`}>
            <a>Read More</a>
          </Link>
        </article>
      ))}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(['date', 'description', 'slug', 'title']);
  return {
    props: { posts },
  };
};

export default Index;