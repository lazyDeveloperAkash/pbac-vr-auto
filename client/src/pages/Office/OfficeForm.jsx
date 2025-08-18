import { useState } from "react";

export default function OfficeForm({ initial, onSubmit, onCancel }) {
  const [name, setName] = useState(initial?.name || "");
  const [address, setAddress] = useState(initial?.location || "");
  const submit = (e) => {
    e.preventDefault();
    onSubmit({ name, location: address });
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
          <span className="text-sm">Address</span>
          <input
            className="w-full border rounded-xl px-3 py-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
