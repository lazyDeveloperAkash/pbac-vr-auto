import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userSlice } from '../../store'
import CrudTable from '../../components/CrudTable'
import Modal from '../../components/Modal'
import usePermission from '../../hooks/usePermission'
import UserForm from './UserForm'

export default function UserList() {
  const dispatch = useDispatch()
  const { items } = useSelector(s => s.users)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const perms = usePermission('User')

  useEffect(() => { if (perms.canRead) dispatch(userSlice.fetchAll()) }, [])

  const columns = [ { key: 'name', header: 'Name' }, { key: 'email', header: 'Email' }, { key: 'role', header: 'Role' } ]

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Users</h2>
        {perms.canCreate && <button className="px-3 py-2 rounded-xl bg-black text-white" onClick={()=>{setEditing(null); setOpen(true)}}>New User</button>}
      </div>
      <CrudTable columns={columns} rows={items} onEdit={perms.canUpdate? setEditing : null} onDelete={perms.canDelete? (id)=>dispatch(userSlice.deleteItem(id)) : null} />
      <Modal open={open || !!editing} title={editing? 'Edit User' : 'Create User'} onClose={()=>{ setOpen(false); setEditing(null) }}>
        <UserForm initial={editing} onCancel={()=>{ setOpen(false); setEditing(null) }} onSubmit={(payload)=>{
          if (editing) dispatch(userSlice.updateItem({ id: editing._id, payload }))
          else dispatch(userSlice.createItem(payload))
          setOpen(false); setEditing(null)
        }} />
      </Modal>
    </section>
  )
}
