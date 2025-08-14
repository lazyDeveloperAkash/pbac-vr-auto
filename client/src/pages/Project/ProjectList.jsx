import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { projectSlice } from '../../store'
import CrudTable from '../../components/CrudTable'
import Modal from '../../components/Modal'
import usePermission from '../../hooks/usePermission'
import ProjectForm from './ProjectForm'

export default function ProjectList() {
  const dispatch = useDispatch()
  const { items } = useSelector(s => s.projects)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const perms = usePermission('Project')

  useEffect(() => { if (perms.canRead) dispatch(projectSlice.fetchAll()) }, [])

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'status', header: 'Status' },
    { key: 'budget', header: 'Budget' },
  ]

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Projects</h2>
        {perms.canCreate && <button className="px-3 py-2 rounded-xl bg-black text-white" onClick={()=>{setEditing(null); setOpen(true)}}>New Project</button>}
      </div>
      <CrudTable columns={columns} rows={items} onEdit={perms.canUpdate? setEditing : null} onDelete={perms.canDelete? (id)=>dispatch(projectSlice.deleteItem(id)) : null} />
      <Modal open={open || !!editing} title={editing? 'Edit Project' : 'Create Project'} onClose={()=>{ setOpen(false); setEditing(null) }}>
        <ProjectForm initial={editing} onCancel={()=>{ setOpen(false); setEditing(null) }} onSubmit={(payload)=>{
          if (editing) dispatch(projectSlice.updateItem({ id: editing._id, payload }))
          else dispatch(projectSlice.createItem(payload))
          setOpen(false); setEditing(null)
        }} />
      </Modal>
    </section>
  )
}
