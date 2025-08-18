import { useState } from "react";
import { useSelector } from "react-redux";
export default function ProjectForm({ initial, onSubmit, onCancel }) {
  const { user } = useSelector((s) => s.auth);
  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [status, setStatus] = useState(initial?.status || "Planning");
  const [budget, setBudget] = useState(initial?.budget || "");
  const [startDate, setStartDate] = useState(
    initial?.startDate?.slice(0, 10) || ""
  );
  const [endDate, setEndDate] = useState(initial?.endDate?.slice(0, 10) || "");
  const [office, setOffice] = useState(user?.office);

  const submit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      status,
      budget: Number(budget || 0),
      startDate,
      endDate,
      office,
    });
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-1">
          <span className="text-sm">Name</span>
          <input
            className="w-full border rounded-xl px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm">Status</span>
          <select
            className="w-full border rounded-xl px-3 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Planning</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>On Hold</option>
          </select>
        </label>
        <label className="space-y-1 col-span-2">
          <span className="text-sm">Description</span>
          <textarea
            className="w-full border rounded-xl px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm">Budget</span>
          <input
            className="w-full border rounded-xl px-3 py-2"
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm">Office ID</span>
          <input
            disabled={true}
            className="w-full border rounded-xl px-3 py-2"
            value={office}
            onChange={(e) => setOffice(e.target.value)}
            required
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm">Start</span>
          <input
            className="w-full border rounded-xl px-3 py-2"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm">End</span>
          <input
            className="w-full border rounded-xl px-3 py-2"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
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
