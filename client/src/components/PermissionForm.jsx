import { useState } from "react";
import { useSelector } from "react-redux";

const modules = ["User", "Office", "Task", "Project", "Attendance", "Leave"];

export default function PermissionForm({
  permission,
  onSave,
  onCancel,
  isEditing,
}) {
  const { user } = useSelector((s) => s.auth);
  const [formData, setFormData] = useState({
    office: user?.office || "",
    module: permission?.module || "",
    canCreate: permission?.canCreate || false,
    canRead: permission?.canRead || true,
    canUpdate: permission?.canUpdate || false,
    canDelete: permission?.canDelete || false,
  });

  const offices = [{ name: "My Office", _id: user.office }];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Office
          </label>
          <select
            value={formData.office}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, office: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isEditing}
          >
            <option value="">Select Office</option>
            {offices.map((office) => (
              <option key={office._id} value={office._id}>
                {office.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Module
          </label>
          <select
            value={formData.module}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, module: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isEditing}
          >
            <option value="">Select Module</option>
            {modules.map((module) => (
              <option key={module} value={module}>
                {module}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Permissions
        </label>
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: "canCreate", label: "Create" },
            { key: "canRead", label: "Read" },
            { key: "canUpdate", label: "Update" },
            { key: "canDelete", label: "Delete" },
          ]
            .filter((obj) => {
              if (formData.module === "Office") {
                return obj.label === "Read" || obj.label === "Update";
              }
              return true;
            })
            .map(({ key, label }) => (
              <div key={key} className="flex items-center">
                <input
                  type="checkbox"
                  id={key}
                  checked={formData[key]}
                  onChange={(e) => {
                    const checked = e.target.checked;

                    setFormData((prev) => {
                      let updated = { ...prev, [key]: checked };

                      // ✅ If user selects Create/Update/Delete → force Read = true
                      if (
                        (key === "canCreate" ||
                          key === "canUpdate" ||
                          key === "canDelete") &&
                        checked
                      ) {
                        updated.canRead = true;
                      }

                      // ✅ If user tries to uncheck Read but other perms exist → keep Read = true
                      if (
                        key === "canRead" &&
                        !checked &&
                        (prev.canCreate || prev.canUpdate || prev.canDelete)
                      ) {
                        updated.canRead = true;
                      }

                      return updated;
                    });
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={key} className="ml-2 text-sm text-gray-700">
                  {label}
                </label>
              </div>
            ))}
        </div>
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
          {isEditing ? "Update" : "Create"} Permission
        </button>
      </div>
    </form>
  );
}
