import { useState, useEffect } from "react";
import api from "../../api/axios"

export default function LeaveForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    employee: initial?.employee?._id || "", // will store selected employee _id
    startDate: initial?.startDate?.slice(0, 10) || "" || "",
    endDate: initial?.endDate?.slice(0, 10) || "" || "",
    reason: initial?.reason || "",
    type: initial?.type || "Casual",
  });

  const [query, setQuery] = useState(initial?.employee?.name || ""); // for typing employee name
  const [results, setResults] = useState([]); // API results
  const [loading, setLoading] = useState(false);

  // debounce search
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setLoading(true);
        const {data} = await api.get(`/users/search/${query}`);
        setResults(data.data || []);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 400); // 400ms debounce

    return () => clearTimeout(delay);
  }, [query]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form); // send final form to parent
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <h1 className="text-xl font-bold">
        {initial ? "Edit Leave" : "Apply Leave"}
      </h1>

      {/* Employee Search */}
      <label className="space-y-1 relative">
        <span className="text-sm">Employee</span>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setForm({ ...form, employee: "" }); // reset selected id
          }}
          placeholder="Search employee"
          className="w-full border rounded-xl px-3 py-2"
        />
        {loading && <p className="text-xs text-gray-400">Searching...</p>}
        {results.length > 0 && (
          <ul className="absolute z-10 bg-white border w-full mt-1 rounded-xl max-h-40 overflow-y-auto">
            {results.map((u) => (
              <li
                key={u._id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setForm({ ...form, employee: u._id });
                  setQuery(u.name); // display name
                  setResults([]);
                }}
              >
                {u.name}
              </li>
            ))}
          </ul>
        )}
      </label>

      <label className="space-y-1">
        <span className="text-sm">Start Date</span>
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
          className="w-full border rounded-xl px-3 py-2"
        />
      </label>

      <label className="space-y-1">
        <span className="text-sm">End Date</span>
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          required
          className="w-full border rounded-xl px-3 py-2"
        />
      </label>

      <label className="space-y-1">
        <span className="text-sm">Reason</span>
        <input
          type="text"
          name="reason"
          value={form.reason}
          onChange={handleChange}
          placeholder="Reason"
          required
          className="w-full border rounded-xl px-3 py-2"
        />
      </label>

      <label className="space-y-1">
        <span className="text-sm">Leave Type</span>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border rounded-xl px-3 py-2"
        >
          <option>Casual</option>
          <option>Sick</option>
          <option>Earned</option>
        </select>
      </label>

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
