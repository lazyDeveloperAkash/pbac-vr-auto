import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function TaskForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    assignedTo: initial?.assignedTo?._id || "",
    project: initial?.project?._id || "",
    title: initial?.title || "",
    description: initial?.description || "",
    status: initial?.status || "Pending",
    priority: initial?.priority || "Medium",
    dueDate: initial?.dueDate ? initial?.dueDate.split("T")[0] : "",
  });

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProject = async () => {
      try {
        const { data } = await api.get("/projects/office");
        setProjects(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (!projects.length !== 0) getProject();
  }, []);

  // USER SEARCH
  const [userQuery, setUserQuery] = useState(initial?.assignedTo?.name || "");
  const [userResults, setUserResults] = useState([]);
  const [userLoading, setUserLoading] = useState(false);

  // PROJECT SEARCH (we already have projects from props)
  const [projectQuery, setProjectQuery] = useState(
    initial?.project?.name || ""
  );
  const [projectResults, setProjectResults] = useState([]);

  // debounce user search
  useEffect(() => {
    if (!userQuery) {
      setUserResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setUserLoading(true);
        const { data } = await api.get(`/users/search/${userQuery}`);
        setUserResults(data.data || []);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setUserLoading(false);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [userQuery]);

  // project search from props (no API call)
  useEffect(() => {
    if (!projectQuery) {
      setProjectResults([]);
      return;
    }

    const delay = setTimeout(() => {
      const filtered = projects.filter((p) =>
        p.name.toLowerCase().includes(projectQuery.toLowerCase())
      );
      setProjectResults(filtered);
    }, 400);

    return () => clearTimeout(delay);
  }, [projectQuery, projects]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <h1 className="text-xl font-bold">
        {initial ? "Edit Task" : "Create Task"}
      </h1>

      {/* User Search */}
      <label className="space-y-1 relative">
        <span className="text-sm">User</span>
        <input
          type="text"
          value={userQuery}
          onChange={(e) => {
            setUserQuery(e.target.value);
            setForm({ ...form, assignedTo: "" });
          }}
          placeholder="Search user"
          className="w-full border rounded-xl px-3 py-2"
        />
        {userLoading && <p className="text-xs text-gray-400">Searching...</p>}
        {userResults.length > 0 && (
          <ul className="absolute z-10 bg-white border w-full mt-1 rounded-xl max-h-40 overflow-y-auto">
            {userResults.map((u) => (
              <li
                key={u._id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setForm({ ...form, assignedTo: u._id });
                  setUserQuery(u.name);
                  setUserResults([]);
                }}
              >
                {u.name}
              </li>
            ))}
          </ul>
        )}
      </label>

      {/* Project Search */}
      <label className="space-y-1 relative">
        <span className="text-sm">Project</span>
        <input
          type="text"
          value={projectQuery}
          onChange={(e) => {
            setProjectQuery(e.target.value);
            setForm({ ...form, project: "" });
          }}
          placeholder="Search project"
          className="w-full border rounded-xl px-3 py-2"
        />
        {projectResults.length > 0 && (
          <ul className="absolute z-10 bg-white border w-full mt-1 rounded-xl max-h-40 overflow-y-auto">
            {projectResults.map((p) => (
              <li
                key={p._id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setForm({ ...form, project: p._id });
                  setProjectQuery(p.name);
                  setProjectResults([]);
                }}
              >
                {p.name}
              </li>
            ))}
          </ul>
        )}
      </label>

      {/* Title */}
      <label className="space-y-1">
        <span className="text-sm">Title</span>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border rounded-xl px-3 py-2"
        />
      </label>

      {/* Description */}
      <label className="space-y-1">
        <span className="text-sm">Description</span>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full border rounded-xl px-3 py-2"
        />
      </label>

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <div className="flex justify-end gap-2 mt-2">
        {onCancel && (
          <button
            type="button"
            className="px-3 py-2 rounded-xl border"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-3 py-2 rounded-xl bg-black text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
}
