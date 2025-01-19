import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  console.log(localStorage.getItem('access-token'))

  const { mutate: deleteUser } = useMutation({
    mutationFn: async (userId) => {
      const res = await axiosSecure.delete(`/users/${userId}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User deleted successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    },
    onError: (err) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${err.response?.data?.message || err.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const { mutate: updateUser } = useMutation({
    mutationFn: async ({ userId, role }) => {
      const res = await axiosSecure.patch(`/users/${userId}`, { role });
      return res.data;
    },
    onSuccess: (_, { role }) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `User role updated to ${role}!`,
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    },
    onError: (err) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${err.response?.data?.message || err.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const handleUpdate = (userId, role) => {
    updateUser({ userId, role });
  };

  const handleDelete = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#ff8c42",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(userId);
      }
    });
  };

  const roles = ["admin", "buyer", "worker"];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Manage Users ({users.length})
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Coin</th>
              <th className="text-center">Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photo} alt="" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>$ {user.availableCoin}</td>
                <td className="flex items-center justify-center">
                  <select
                    onChange={(e) => handleUpdate(user._id, e.target.value)}
                    defaultValue={user.role}
                    className="select select-ghost"
                  >
                    <option value="" disabled>
                      Role
                    </option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2">
                  <FaTrash
                    onClick={() => handleDelete(user._id)}
                    className="text-2xl text-error-red cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
