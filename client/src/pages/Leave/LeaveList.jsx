import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { leaveSlice } from '../../store'
import CrudTable from '../../components/CrudTable'
import Modal from '../../components/Modal'
import usePermission from '../../hooks/usePermission'

export default function LeaveList() {
  const dispatch = useDispatch(); const { items } = useSelector(s=>s.leaves)
  const [open, setOpen] = useState(false); const [editing, setEditing] = useState(null)
  const perms = usePermission('Leave')
  useEffect(()=>{ if (perms.canRead) dispatch(leaveSlice.fetchAll()) },[])
  const columns = [{ key:'startDate', header:'Start', render: r => new Date(r.startDate).toLocaleDateString() }, { key:'endDate', header:'End', render: r => new Date(r.endDate).toLocaleDateString() }, { key:'status', header:'Status' }]
  return (<section className="space-y-3">
    <div className="flex items-center justify-between"><h2 className="text-xl font-semibold">Leaves</h2>{perms.canCreate && <button className="px-3 py-2 rounded-xl bg-black text-white" onClick={()=>setOpen(true)}>New</button>}</div>
    <CrudTable columns={columns} rows={items} onEdit={perms.canUpdate? setEditing:null} onDelete={perms.canDelete? (id)=>dispatch(leaveSlice.deleteItem(id)):null} />
    <Modal open={open || !!editing} title={editing?'Edit Leave':'Create Leave'} onClose={()=>{ setOpen(false); setEditing(null) }}>
      <LeaveForm initial={editing} onCancel={()=>{ setOpen(false); setEditing(null) }} onSubmit={(payload)=>{ if (editing) dispatch(leaveSlice.updateItem({id:editing._id,payload})); else dispatch(leaveSlice.createItem(payload)); setOpen(false); setEditing(null) }} />
    </Modal>
  </section>)
}