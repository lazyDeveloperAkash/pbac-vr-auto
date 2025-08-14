import { useState } from "react";
import { useDispatch } from "react-redux";
import { createLeave } from "../../store/leaveSlice";
import { useNavigate } from "react-router-dom";

export default function LeaveForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    reason: "",
    type: "Casual",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createLeave(form));
    navigate("/leaves");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Apply Leave</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="reason"
          value={form.reason}
          onChange={handleChange}
          placeholder="Reason"
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option>Casual</option>
          <option>Sick</option>
          <option>Earned</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
