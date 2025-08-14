import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { departmentSlice } from '../../store'
import CrudTable from '../../components/CrudTable'
import Modal from '../../components/Modal'
import usePermission from '../../hooks/usePermission'

export default function DepartmentList() {
  const dispatch = useDispatch(); const { items } = useSelector(s=>s.departments)
  const [open, setOpen] = useState(false); const [editing, setEditing] = useState(null)
  const perms = usePermission('Department')
  useEffect(()=>{ if (perms.canRead) dispatch(departmentSlice.fetchAll()) },[])
  const columns = [{ key:'name', header:'Name' }, { key:'description', header:'Description' }]
  return (<section className="space-y-3">
    <div className="flex items-center justify-between"><h2 className="text-xl font-semibold">Departments</h2>{perms.canCreate && <button className="px-3 py-2 rounded-xl bg-black text-white" onClick={()=>setOpen(true)}>New</button>}</div>
    <CrudTable columns={columns} rows={items} onEdit={perms.canUpdate? setEditing:null} onDelete={perms.canDelete? (id)=>dispatch(departmentSlice.deleteItem(id)):null} />
    <Modal open={open || !!editing} title={editing?'Edit Department':'Create Department'} onClose={()=>{ setOpen(false); setEditing(null) }}>
      <DepartmentForm initial={editing} onCancel={()=>{ setOpen(false); setEditing(null) }} onSubmit={(payload)=>{ if (editing) dispatch(departmentSlice.updateItem({id:editing._id,payload})); else dispatch(departmentSlice.createItem(payload)); setOpen(false); setEditing(null) }} />
    </Modal>
  </section>)
}