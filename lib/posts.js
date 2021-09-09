// node-fetchはnode.jsアプリでfetchを扱えるようにするためのライブラリ。
import fetch from "node-fetch";

export const getAllPostsData = async () => {
  // 作成したREST APIからブログ記事一覧をfetchで取得
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`)
  );
  // 取得してきた記事をJSON形式に変換
  const posts = await res.json();
  const filterPosts = posts.sort(
    // created_atが大きい順、つまり新しい順にposts配列を並び替える。
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  return filterPosts;
}