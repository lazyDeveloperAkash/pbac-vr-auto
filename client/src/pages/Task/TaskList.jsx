import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../../store/taskSlice";
import { Link } from "react-router-dom";

export default function TaskList() {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((s) => s.tasks);
  const { permissions } = useSelector((s) => s.auth);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Tasks</h1>
        {permissions?.Task?.Create && (
          <Link
            to="/tasks/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            + Add Task
          </Link>
        )}
      </div>
      <table className="w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Priority</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="border-t">
              <td className="p-2">{task.title}</td>
              <td className="p-2">{task.status}</td>
              <td className="p-2">{task.priority}</td>
              <td className="p-2 space-x-2">
                {permissions?.Task?.Update && (
                  <Link
                    to={`/tasks/${task._id}/edit`}
                    className="text-blue-600 underline"
                  >
                    Edit
                  </Link>
                )}
                {permissions?.Task?.Delete && (
                  <button
                    onClick={() => dispatch(deleteTask(task._id))}
                    className="text-red-600 underline"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
