import { async } from "regenerator-runtime";
import Cookie from "universal-cookie";

const cookie = new Cookie();

const Task = ({ task, taskDeleted }) => {
  const deleteTask = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${task.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`,
      }
    }).then((res) => {
      if (res.status === 401) {
        alert("JWT Token not valid");
      }
    });
    taskDeleted();
  }

  return (
    <div>
      <span>{task.id}</span>
      {" : "}
      <span className="cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600">
        {task.title}
      </span>
      <div className="float-right cursor-pointer">
        <button type="button" onClick={deleteTask}>削除</button>
      </div>
    </div>
  )
}

export default Task;