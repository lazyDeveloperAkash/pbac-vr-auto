import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import permissionReducer from '../slices/permissionSlice'
import makeCrudSlice from '../slices/makeCrudSlice'

// entity slices using the generic factory
export const attendanceSlice = makeCrudSlice('attendance')
export const departmentSlice = makeCrudSlice('departments')
export const leaveSlice = makeCrudSlice('leaves')
export const officeSlice = makeCrudSlice('offices')
export const projectSlice = makeCrudSlice('projects')
export const taskSlice = makeCrudSlice('tasks')
export const userSlice = makeCrudSlice('users')

const store = configureStore({
  reducer: {
    auth: authReducer,
    permission: permissionReducer,
    attendance: attendanceSlice.reducer,
    departments: departmentSlice.reducer,
    leaves: leaveSlice.reducer,
    offices: officeSlice.reducer,
    projects: projectSlice.reducer,
    tasks: taskSlice.reducer,
    users: userSlice.reducer,
  },
})

export default store