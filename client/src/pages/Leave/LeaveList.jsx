import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { leaveSlice } from "../../store";
import CrudTable from "../../components/CrudTable";
import Modal from "../../components/Modal";
import usePermission from "../../hooks/usePermission";
import LeaveForm from "./LeaveForm";

export default function LeaveList() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.leaves);
  const { user } = useSelector((s) => s.auth);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const perms = usePermission("Leave");

  useEffect(() => {
    if (perms.canRead || user?.role === "ADMIN")
      dispatch(leaveSlice.fetchAll());
  }, []);
  const columns = [
    {
      key: "startDate",
      header: "Start",
      render: (r) => new Date(r.startDate).toLocaleDateString(),
    },
    {
      key: "endDate",
      header: "End",
      render: (r) => new Date(r.endDate).toLocaleDateString(),
    },
    { key: "status", header: "Status" },
  ];
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Leaves</h2>
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
              <span>Create Leave</span>
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
            ? (id) => dispatch(leaveSlice.deleteItem(id))
            : null
        }
      />
      <Modal
        open={open || !!editing}
        title={editing ? "Edit Leave" : "Create Leave"}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
      >
        <LeaveForm
          initial={editing}
          onCancel={() => {
            setOpen(false);
            setEditing(null);
          }}
          onSubmit={(payload) => {
            if (editing)
              dispatch(leaveSlice.updateItem({ id: editing._id, payload }));
            else dispatch(leaveSlice.createItem(payload));
            setOpen(false);
            setEditing(null);
          }}
        />
      </Modal>
    </section>
  );
}
