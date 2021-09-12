import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

const Post = ({ post }) => {
  const router = useRouter();

  // 存在していないidのページにアクセスした時に、isFallbackがtrueになる
  if (router.isFallback || !post) {
    return <div>Loading...</div>
  }
  return (
    <Layout title={post.title}>
      <p className="m-4">
        {"ID : "}
        {post.id}
      </p>
      <p className="mb-4 text-xl font-bold">{post.title}</p>
      <p className="mb-12">{post.created_at}</p>
      <p className="px-10">{post.content}</p>
      <Link href="/blog-page">
        <div className="flex cursor-pointer mt-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          <span>ブログ一覧へ戻る</span>
        </div>
      </Link>
    </Layout>
  )
}

export default Post;

export const getStaticPaths = async () => {
  const paths = await getAllPostIds();

  // 詳細画面で新しく追加された記事に対して「404 Not Found」の画面が表示されないようにするために「fallback: true」を設定
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async ({ params }) => {
  const { post: post } = await getPostData(params.id);
  return {
    props: {
      post,
    },
    // HTML再生性のインターバルの時間を3秒に指定
    revalidate: 3,
  }
}