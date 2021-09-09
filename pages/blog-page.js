import Layout from "../components/Layout";
import Link from "next/link";
import { getAllPostsData } from '../lib/posts';
import Post from '../components/Post';

const BlogPage = ({ filteredPosts }) => {
  console.log(filteredPosts)
  return (
    <Layout title="Blog Page">
      <ul>
        {filteredPosts && filteredPosts.map((post) => <Post key={post.id} post={post} />)}
      </ul>
      <Link href="/main-page">
        <div className="flex cursor-pointer mt-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          <span>メインページに戻る</span>
        </div>
      </Link>
    </Layout>
  )
}

// ビルド時に呼び出され、サーバーサイドで実行される
export const getStaticProps = async () => {
  const filteredPosts = await getAllPostsData();
  return {
    props: { filteredPosts },
  };
}

export default BlogPage