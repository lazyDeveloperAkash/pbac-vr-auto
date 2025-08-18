import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CrudTable from "./CrudTable";
import Modal from "./Modal";
import { Copy, Eye, Plus, Settings, Users } from "lucide-react";
import PermissionForm from "./PermissionForm";
import CopyPermissionsForm from "./CopyPermissionsForm";
import { userSlice } from "../store";
import api from "../api/axios";

const PermissionManagement = () => {
  const { items } = useSelector((s) => s.users);
  const [users, setUsers] = useState(items || []);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [userPermissions, setUserPermissions] = useState([]);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [editingPermission, setEditingPermission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);

  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  const isAdmin = user.role === "ADMIN";

  // Load initial data
  useEffect(() => {
    if (isAdmin) {
      dispatch(userSlice.fetchAll());
    } else {
      // For regular users, show their own permissions
      setSelectedUserId(user._id);
      setSelectedUserName(user.name);
      //   setShowPermissionsModal(true);
    }
  }, []);

  useEffect(() => {
    setUsers(items.filter((u) => u.role !== "ADMIN"));
  }, [items]);

  useEffect(() => {
    loadUserPermissions(user._id);
  }, []);

  const loadUserPermissions = async (userId) => {
    setLoading(true);
    try {
      const response = await api.get(`/permissions/${userId}`);
      setUserPermissions(response.data.data);
      console.log(response, "res");
    } catch (error) {
      //   showNotification('Error loading permissions', 'error');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //   const showNotification = (message, type = 'success') => {
  //     setNotification({ message, type });
  //     setTimeout(() => setNotification(null), 5000);
  //   };

  const handleUserRowClick = (user) => {
    if (!isAdmin) return;

    setSelectedUserId(user._id);
    setSelectedUserName(user.name);
    setShowPermissionsModal(true);
    loadUserPermissions(user._id);
  };

  const handleEditPermission = (permission) => {
    setEditingPermission(permission);
    setShowEditModal(true);
  };

  const handleDeletePermission = async (permissionId) => {
    if (!confirm("Are you sure you want to delete this permission?")) return;

    try {
      await api.delete(`/permissions/${permissionId}`);
      //   showNotification('Permission deleted successfully');
      loadUserPermissions(selectedUserId);
    } catch (error) {
      //   showNotification('Error deleting permission', 'error');
    }
  };

  const handleSavePermission = async (permissionData) => {
    try {
      if (editingPermission) {
        // Update existing permission
        await api.put(`/permissions/${editingPermission._id}`, {
          ...permissionData,
          user: selectedUserId,
        });
        // showNotification('Permission updated successfully');
      } else {
        // Create new permission
        await api.post("/permissions", {
          ...permissionData,
          user: selectedUserId,
        });
        // showNotification('Permission created successfully');
      }

      setShowEditModal(false);
      setShowAddModal(false);
      setEditingPermission(null);
      loadUserPermissions(selectedUserId);
    } catch (error) {
      //   showNotification('Error saving permission', 'error');
      console.log(error);
    }
  };

  const handleCopyPermissions = async (copyData) => {
    try {
      await api.post("/permissions/copy", copyData);
      //   showNotification('Permissions copied successfully');
      setShowCopyModal(false);
      loadUserPermissions(selectedUserId);
    } catch (error) {
      //   showNotification('Error copying permissions', 'error');
    }
  };

  // User table columns
  const userColumns = [
    {
      key: "name",
      header: "Name",
    },
    {
      key: "email",
      header: "Email",
    },
    {
      key: "role",
      header: "Role",
      render: (user) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            user.role === "ADMIN"
              ? "bg-purple-100 text-purple-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {user.role}
        </span>
      ),
    },
    // {
    //   key: "permissions",
    //   header: "Permissions",
    //   render: (user) => {
    //     const userPerms = mockPermissions[user._id] || [];
    //     return (
    //       <span className="text-sm text-gray-600">
    //         {userPerms.length} permission{userPerms.length !== 1 ? "s" : ""}
    //       </span>
    //     );
    //   },
    // },
  ];

  // Permission table columns
  const permissionColumns = [
    {
      key: "module",
      header: "Module",
      render: (permission) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {permission.module}
        </span>
      ),
    },
    {
      key: "canCreate",
      header: "Create",
      render: (permission) => (
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            permission.canCreate
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {permission.canCreate ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "canRead",
      header: "Read",
      render: (permission) => (
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            permission.canRead
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {permission.canRead ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "canUpdate",
      header: "Update",
      render: (permission) => (
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            permission.canUpdate
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {permission.canUpdate ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "canDelete",
      header: "Delete",
      render: (permission) => (
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            permission.canDelete
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {permission.canDelete ? "Yes" : "No"}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Settings className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">
                {isAdmin ? "Permission Management" : "My Permissions"}
              </h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Welcome, {user.name}</span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.role === "ADMIN"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isAdmin ? (
          // Admin View: Users Table
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <h2 className="text-lg font-medium text-gray-900">Users</h2>
                </div>
                <div className="text-sm text-gray-500">
                  Click on a user to manage their permissions
                </div>
              </div>
            </div>
            <div className="p-6">
              <CrudTable
                columns={userColumns}
                rows={users}
                onRowClick={handleUserRowClick}
                loading={usersLoading}
              />
            </div>
          </div>
        ) : (
          <CrudTable
            columns={permissionColumns}
            rows={userPermissions}
            onEdit={isAdmin ? handleEditPermission : null}
            onDelete={isAdmin ? handleDeletePermission : null}
            loading={loading}
          />
        )}
      </div>

      {/* User Permissions Modal */}
      <Modal
        open={showPermissionsModal}
        title={`Permissions for ${selectedUserName}`}
        onClose={() => setShowPermissionsModal(false)}
        size="max-w-6xl"
      >
        <div className="space-y-4">
          {isAdmin && (
            <div className="flex justify-between items-center">
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <Plus size={16} className="mr-2" />
                  Add Permission
                </button>
                <button
                  onClick={() => setShowCopyModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  <Copy size={16} className="mr-2" />
                  Copy Permissions
                </button>
              </div>
            </div>
          )}

          <CrudTable
            columns={permissionColumns}
            rows={userPermissions}
            onEdit={isAdmin ? handleEditPermission : null}
            onDelete={isAdmin ? handleDeletePermission : null}
            loading={loading}
          />
        </div>
      </Modal>

      {/* Add Permission Modal */}
      <Modal
        open={showAddModal}
        title="Add New Permission"
        onClose={() => setShowAddModal(false)}
      >
        <PermissionForm
          onSave={handleSavePermission}
          onCancel={() => setShowAddModal(false)}
          isEditing={false}
        />
      </Modal>

      {/* Edit Permission Modal */}
      <Modal
        open={showEditModal}
        title="Edit Permission"
        onClose={() => {
          setShowEditModal(false);
          setEditingPermission(null);
        }}
      >
        <PermissionForm
          permission={editingPermission}
          onSave={handleSavePermission}
          onCancel={() => {
            setShowEditModal(false);
            setEditingPermission(null);
          }}
          isEditing={true}
        />
      </Modal>

      {/* Copy Permissions Modal */}
      <Modal
        open={showCopyModal}
        title="Copy Permissions"
        onClose={() => setShowCopyModal(false)}
      >
        <CopyPermissionsForm
          users={items}
          targetUserId={selectedUserId}
          onSave={handleCopyPermissions}
          onCancel={() => setShowCopyModal(false)}
        />
      </Modal>

      {/* Notification */}
      {/* <Notification
        notification={notification}
        onClose={() => setNotification(null)}
      /> */}
    </div>
  );
};

export default PermissionManagement;
