import { useState } from "react";
import { useSelector } from "react-redux";

export default function CopyPermissionsForm({
  users,
  targetUserId,
  onSave,
  onCancel,
}) {
  const { user } = useSelector((s) => s.auth);
  const [formData, setFormData] = useState({
    fromUserId: "",
    officeId: "",
  });

  const offices = [{ name: "My Office", _id: user.office }];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      fromUserId: formData.fromUserId,
      toUserId: targetUserId,
      officeId: formData.officeId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Copy from User
        </label>
        <select
          value={formData.fromUserId}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, fromUserId: e.target.value }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select User</option>
          {users
            .filter((user) => user._id !== targetUserId && user.role !== "ADMIN")
            .map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Office
        </label>
        <select
          value={formData.officeId}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, officeId: e.target.value }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Office</option>
          {offices.map((office) => (
            <option key={office._id} value={office._id}>
              {office.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Copy Permissions
        </button>
      </div>
    </form>
  );
}
