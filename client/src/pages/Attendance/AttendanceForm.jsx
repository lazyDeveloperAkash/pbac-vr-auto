import { useState } from 'react'
export default function AttendanceForm({ initial, onSubmit, onCancel }) {
  const [employee, setEmployee] = useState(initial?.employee || '')
  const [date, setDate] = useState(initial?.date?.slice(0,10) || '')
  const [status, setStatus] = useState(initial?.status || 'Present')
  const [checkIn, setCheckIn] = useState(initial?.checkIn?.slice(0,16) || '')
  const [checkOut, setCheckOut] = useState(initial?.checkOut?.slice(0,16) || '')
  const submit = (e) => { e.preventDefault(); onSubmit({ employee, date, status, checkIn, checkOut }) }
  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-1"><span className="text-sm">Employee ID</span><input className="w-full border rounded-xl px-3 py-2" value={employee} onChange={e=>setEmployee(e.target.value)} required /></label>
        <label className="space-y-1"><span className="text-sm">Date</span><input className="w-full border rounded-xl px-3 py-2" type="date" value={date} onChange={e=>setDate(e.target.value)} required /></label>
        <label className="space-y-1"><span className="text-sm">Status</span><select className="w-full border rounded-xl px-3 py-2" value={status} onChange={e=>setStatus(e.target.value)}><option>Present</option><option>Absent</option><option>On Leave</option></select></label>
        <label className="space-y-1"><span className="text-sm">Check In</span><input className="w-full border rounded-xl px-3 py-2" type="datetime-local" value={checkIn} onChange={e=>setCheckIn(e.target.value)} /></label>
        <label className="space-y-1"><span className="text-sm">Check Out</span><input className="w-full border rounded-xl px-3 py-2" type="datetime-local" value={checkOut} onChange={e=>setCheckOut(e.target.value)} /></label>
      </div>
      <div className="flex justify-end gap-2"><button type="button" className="px-3 py-2 rounded-xl border" onClick={onCancel}>Cancel</button><button className="px-3 py-2 rounded-xl bg-black text-white">Save</button></div>
    </form>
  )
}
