export function DepartmentForm({ initial, onSubmit, onCancel }) {
  const [name, setName] = useState(initial?.name || '')
  const [description, setDescription] = useState(initial?.description || '')
  const [office, setOffice] = useState(initial?.office || '')
  const submit = (e) => { e.preventDefault(); onSubmit({ name, description, office }) }
  return (<form onSubmit={submit} className="space-y-3">
    <div className="grid grid-cols-2 gap-3">
      <label className="space-y-1"><span className="text-sm">Name</span><input className="w-full border rounded-xl px-3 py-2" value={name} onChange={e=>setName(e.target.value)} required /></label>
      <label className="space-y-1"><span className="text-sm">Description</span><input className="w-full border rounded-xl px-3 py-2" value={description} onChange={e=>setDescription(e.target.value)} /></label>
      <label className="space-y-1"><span className="text-sm">Office ID</span><input className="w-full border rounded-xl px-3 py-2" value={office} onChange={e=>setOffice(e.target.value)} required /></label>
    </div>
    <div className="flex justify-end gap-2"><button type="button" className="px-3 py-2 rounded-xl border" onClick={onCancel}>Cancel</button><button className="px-3 py-2 rounded-xl bg-black text-white">Save</button></div>
  </form>)
}