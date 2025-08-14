import { useState } from 'react'
export default function UserForm({ initial, onSubmit, onCancel }) {
  const [name, setName] = useState(initial?.name || '')
  const [email, setEmail] = useState(initial?.email || '')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState(initial?.role || 'EMPLOYEE')
  const [office, setOffice] = useState(initial?.office || '')
  const submit = (e) => { e.preventDefault(); onSubmit({ name, email, ...(password?{password}:{}), role, office }) }
  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-1"><span className="text-sm">Name</span><input className="w-full border rounded-xl px-3 py-2" value={name} onChange={e=>setName(e.target.value)} required /></label>
        <label className="space-y-1"><span className="text-sm">Email</span><input className="w-full border rounded-xl px-3 py-2" value={email} onChange={e=>setEmail(e.target.value)} required type="email" /></label>
        {!initial && (<label className="space-y-1"><span className="text-sm">Password</span><input className="w-full border rounded-xl px-3 py-2" type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></label>)}
        <label className="space-y-1"><span className="text-sm">Role</span>
          <select className="w-full border rounded-xl px-3 py-2" value={role} onChange={e=>setRole(e.target.value)}>
            <option>EMPLOYEE</option><option>ADMIN</option>
          </select>
        </label>
        <label className="space-y-1"><span className="text-sm">Office ID</span><input className="w-full border rounded-xl px-3 py-2" value={office} onChange={e=>setOffice(e.target.value)} /></label>
      </div>
      <div className="flex justify-end gap-2"><button type="button" className="px-3 py-2 rounded-xl border" onClick={onCancel}>Cancel</button><button className="px-3 py-2 rounded-xl bg-black text-white">Save</button></div>
    </form>
  )
}