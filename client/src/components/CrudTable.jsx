export default function CrudTable({ columns, rows, onEdit, onDelete }) {
  return (
    <div className="overflow-auto border rounded-2xl">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="text-left px-4 py-2 font-medium">{c.header}</th>
            ))}
            {(onEdit || onDelete) && <th className="px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r._id} className="border-t">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-2">{c.render ? c.render(r) : r[c.key]}</td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-4 py-2 space-x-2">
                  {onEdit && <button className="px-2 py-1 border rounded-lg" onClick={() => onEdit(r)}>Edit</button>}
                  {onDelete && <button className="px-2 py-1 border rounded-lg" onClick={() => onDelete(r._id)}>Delete</button>}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
