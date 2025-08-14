import { useSelector } from 'react-redux'

export default function usePermission(moduleName) {
  const perms = useSelector(s => s.permission.items)
  const modulePerm = perms.find(p => p.module?.toLowerCase() === moduleName.toLowerCase())
  const can = (action) => !!modulePerm && !!modulePerm[`can${action}`]
  return { canCreate: can('Create'), canRead: can('Read'), canUpdate: can('Update'), canDelete: can('Delete') }
}
