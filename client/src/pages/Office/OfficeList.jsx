import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { officeSlice } from '../../store'
import CrudTable from '../../components/CrudTable'
import Modal from '../../components/Modal'
import usePermission from '../../hooks/usePermission'
import OfficeForm from './OfficeForm'

export default function OfficeList() {
  const dispatch = useDispatch()
  const { items } = useSelector(s => s.offices)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const perms = usePermission('Office')

  useEffect(() => { if (perms.canRead) dispatch(officeSlice.fetchAll()) }, [])

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'location', header: 'Location', render: (r) => `${r.location?.city || ''}, ${r.location?.country || ''}` },
  ]

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Offices</h2>
        {perms.canCreate && <button className="px-3 py-2 rounded-xl bg-black text-white" onClick={()=>{setEditing(null); setOpen(true)}}>New Office</button>}
      </div>

      <CrudTable columns={columns} rows={items} onEdit={perms.canUpdate? setEditing : null} onDelete={perms.canDelete? (id)=>dispatch(officeSlice.deleteItem(id)) : null} />

      <Modal open={open || !!editing} title={editing? 'Edit Office' : 'Create Office'} onClose={()=>{ setOpen(false); setEditing(null) }}>
        <OfficeForm initial={editing} onCancel={()=>{ setOpen(false); setEditing(null) }} onSubmit={(payload)=>{
          if (editing) dispatch(officeSlice.updateItem({ id: editing._id, payload }))
          else dispatch(officeSlice.createItem(payload))
          setOpen(false); setEditing(null)
        }} />
      </Modal>
    </section>
  )
}