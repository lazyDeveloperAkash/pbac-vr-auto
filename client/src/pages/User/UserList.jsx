import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../../store";
import CrudTable from "../../components/CrudTable";
import Modal from "../../components/Modal";
import usePermission from "../../hooks/usePermission";
import UserForm from "./UserForm";

export default function UserList() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.users);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const perms = usePermission("User");
  const { user } = useSelector((s) => s.auth);

  useEffect(() => {
    if (perms.canRead || user?.role === "ADMIN") dispatch(userSlice.fetchAll());
  }, [user]);

  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
  ];

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Users</h2>
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
              <span>Create User</span>
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
            ? (id) => dispatch(userSlice.deleteItem(id))
            : null
        }
      />
      <Modal
        open={open || !!editing}
        title={editing ? "Edit User" : "Create User"}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
      >
        <UserForm
          initial={editing}
          onCancel={() => {
            setOpen(false);
            setEditing(null);
          }}
          onSubmit={(payload) => {
            if (editing)
              dispatch(userSlice.updateItem({ id: editing._id, payload }));
            else dispatch(userSlice.createItem(payload));
            setOpen(false);
            setEditing(null);
          }}
        />
      </Modal>
    </section>
  );
}
