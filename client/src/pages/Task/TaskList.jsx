import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskSlice } from "../../store";
import CrudTable from "../../components/CrudTable";
import Modal from "../../components/Modal";
import usePermission from "../../hooks/usePermission";
import TaskForm from "./TaskForm";

export default function TaskList() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.tasks);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const perms = usePermission("Task");
  const { user } = useSelector((s) => s.auth);

  useEffect(() => {
    if (perms.canRead || user?.role === "ADMIN") {
      dispatch(taskSlice.fetchAll());
    }
  }, [user]);

  const columns = [
    { key: "title", header: "Title" },
    { key: "description", header: "Description" },
    { key: "status", header: "Status" },
  ];

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tasks</h2>
        {(perms.canCreate || user?.role === "ADMIN") && (
          <button
            className="cursor-pointer px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => {
              setOpen(true);
            }}
          >
            <span className="flex items-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Create Task</span>
            </span>
          </button>
        )}
      </div>
      <CrudTable
        columns={columns}
        rows={items}
        onEdit={perms.canUpdate || user?.role === "ADMIN" ? setEditing : null}
        onDelete={
          perms.canDelete || user?.role === "ADMIN"
            ? (id) => dispatch(taskSlice.deleteItem(id))
            : null
        }
      />
      <Modal
        open={open || !!editing}
        title={editing ? "Edit Task" : "Create Task"}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
      >
        <TaskForm
          initial={editing}
          onCancel={() => {
            setOpen(false);
            setEditing(null);
          }}
          onSubmit={(payload) => {
            if (editing) {
              dispatch(taskSlice.updateItem({ id: editing._id, payload }));
            } else {
              dispatch(taskSlice.createItem(payload));
            }
            setOpen(false);
            setEditing(null);
          }}
        />
      </Modal>
    </section>
  );
}
