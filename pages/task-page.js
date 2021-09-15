import { useEffect } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { getAllTasksData } from "../lib/tasks";
import Task from "../components/Task";
import useSWR from "swr";

// エンドポイントを元にレスポンスを返す
const fetcher = (url) => fetch(url).then((res) => res.json());

// タスクの一覧を取得するエンドポイント 
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`;

const TaskPage = ({ staticfilteredTasks }) => {

  // apiUrlから取得してきた最新データがtasksに入る
  const { data: tasks, mutate } = useSWR(apiUrl, fetcher, {
    // ビルド時にgetStaticPropsで取得してきたデータをinitialDataに設定
    initialData: staticfilteredTasks,
  });

  const filteredTasks = tasks?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  useEffect(() => {
    // mutateにより、useSWRで取得したデータのキャッシュを最新に更新
    mutate();
    console.log(staticfilteredTasks)
    console.log(fetcher);
    console.log(tasks);
    console.log(filteredTasks)
  }, []);

  return (
    <Layout title="Task Page">
      <ul>
        {
          filteredTasks && filteredTasks.map((task) => <Task key={task.id} task={task} taskDeleted={mutate} />)
        }
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

export default TaskPage;

export const getStaticProps = async () => {
  const staticfilteredTasks = await getAllTasksData();

  return {
    props: { staticfilteredTasks },
    revalidate: 3,
  }
}