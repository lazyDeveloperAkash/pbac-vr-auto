import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function AttendanceForm({ initial, onSubmit, onCancel }) {
  const [employee, setEmployee] = useState(initial?.employee?._id || ""); // will store employee _id
  const [employeeName, setEmployeeName] = useState(initial?.employee?.name || ""); // for typing and showing name
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState(initial?.date?.slice(0, 10) || "");
  const [status, setStatus] = useState(initial?.status || "Present");
  const [checkIn, setCheckIn] = useState(initial?.checkIn?.slice(0, 16) || "");
  const [checkOut, setCheckOut] = useState(
    initial?.checkOut?.slice(0, 16) || ""
  );

  // Debounced API call
  useEffect(() => {
    if (!employeeName) {
      setSuggestions([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await api.get(
          `/users/search/${employeeName}`
        );
        console.log(res);
        setSuggestions(res.data.data || []); // expecting [{_id, name}]
      } catch (err) {
        console.error(err);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [employeeName]);

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ employee, date, status, checkIn, checkOut });
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {/* Employee Search Field */}
        <label className="space-y-1 relative">
          <span className="text-sm">Employee</span>
          <input
            className="w-full border rounded-xl px-3 py-2"
            value={employeeName}
            onChange={(e) => {
              setEmployeeName(e.target.value);
              setEmployee(""); // clear id if typing again
            }}
            placeholder="Type employee name..."
          />
          {loading && (
            <div className="absolute right-3 top-9 text-xs text-gray-500">
              Loading...
            </div>
          )}
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border rounded-xl shadow mt-1 max-h-40 overflow-auto">
              {suggestions.map((s) => (
                <li
                  key={s._id}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setEmployee(s._id); // store _id
                    setEmployeeName(s.name); // show name
                    setSuggestions([]); // hide dropdown
                  }}
                >
                  {s.name}
                </li>
              ))}
            </ul>
          )}
        </label>

        {/* Date */}
        <label className="space-y-1">
          <span className="text-sm">Date</span>
          <input
            className="w-full border rounded-xl px-3 py-2"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        {/* Status */}
        <label className="space-y-1">
          <span className="text-sm">Status</span>
          <select
            className="w-full border rounded-xl px-3 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Present</option>
            <option>Absent</option>
            <option>On Leave</option>
          </select>
        </label>

        {/* Check In */}
        <label className="space-y-1">
          <span className="text-sm">Check In</span>
          <input
            className="w-full border rounded-xl px-3 py-2"
            type="datetime-local"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </label>

        {/* Check Out */}
        <label className="space-y-1">
          <span className="text-sm">Check Out</span>
          <input
            className="w-full border rounded-xl px-3 py-2"
            type="datetime-local"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </label>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="px-3 py-2 rounded-xl border"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button className="px-3 py-2 rounded-xl bg-black text-white">
          Save
        </button>
      </div>
    </form>
  );
}
