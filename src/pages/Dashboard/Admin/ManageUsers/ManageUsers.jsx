import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosPublic = useAxiosPublic();


  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosPublic.get('/users')
      return res.data;
    }
  })

  const { mutate: deleteTask } = useMutation({
    mutationFn: async (userId) => {
      const res = await axiosPublic.delete(`/users/${userId}`)
      return res.data
    },
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User deleted successfully!",
        showConfirmButton: false,
        timer: 1500
      });
      // Refetch users to update the list
      refetch();
    },
    onError: (err) => {
      // Show error message
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${err.message}`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  })

  const handleDelete = (userId) => {
    // Confirm delete before making the mutation
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#ff8c42',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(userId);  // Call the mutation to delete the task
      }
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Users{users.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Coin</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => <tr key={user._id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={user.photo}
                        alt="" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user.name}</div>
                    <div className="text-sm opacity-50">{user.email}</div>
                  </div>
                </div>
              </td>
              <td>$ {user.availableCoin}</td>
              <td>Purple</td>
              <td className="px-4 py-2"><FaTrash
                onClick={() => handleDelete(user._id)} className="text-2xl text-error-red cursor-pointer"></FaTrash></td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
