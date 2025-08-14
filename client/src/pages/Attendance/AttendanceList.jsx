import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { attendanceSlice } from '../../store'
import CrudTable from '../../components/CrudTable'
import Modal from '../../components/Modal'
import usePermission from '../../hooks/usePermission'
import AttendanceForm from './AttendanceForm'

export default function AttendanceList() {
  const dispatch = useDispatch()
  const { items } = useSelector(s => s.attendance)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const perms = usePermission('Attendance')
  useEffect(()=>{ if (perms.canRead) dispatch(attendanceSlice.fetchAll()) },[])
  const columns = [{ key: 'status', header: 'Status' }, { key: 'date', header: 'Date' }]
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between"><h2 className="text-xl font-semibold">Attendance</h2>{perms.canCreate && <button className="px-3 py-2 rounded-xl bg-black text-white" onClick={()=>{setOpen(true)}}>New</button>}</div>
      <CrudTable columns={columns} rows={items} onEdit={perms.canUpdate? setEditing : null} onDelete={perms.canDelete? (id)=>dispatch(attendanceSlice.deleteItem(id)) : null} />
      <Modal open={open || !!editing} title={editing? 'Edit Attendance' : 'Create Attendance'} onClose={()=>{ setOpen(false); setEditing(null) }}>
        <AttendanceForm initial={editing} onCancel={()=>{ setOpen(false); setEditing(null) }} onSubmit={(payload)=>{
          if (editing) dispatch(attendanceSlice.updateItem({ id: editing._id, payload }))
          else dispatch(attendanceSlice.createItem(payload))
          setOpen(false); setEditing(null)
        }} />
      </Modal>
    </section>
  )
}
