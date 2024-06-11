import { Helmet } from "react-helmet"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import { useMutation, useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";


const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  //fetch users data
  const {data: users = [], isLoading, refetch} = useQuery({
    queryKey: ['users'],
    queryFn: async()=> {
      const{data} = await axiosSecure.get('/users');
      return data
    }
  });

  // update user role
  const {mutateAsync} = useMutation({
    mutationFn: async ({updatedRole,userEmail}) => {
      console.log(userEmail);
      const {data} = await axiosSecure.patch(`/users/update/${userEmail}`,updatedRole)
      return data;
    },
    onSuccess: (data) => {
      refetch()
      // toast.success('User Role updated')
    }
  })

  // delete user
  const { mutateAsync: deleteUser } = useMutation({
    mutationFn: async (userEmail) => {
      const { data } = await axiosSecure.delete(`/users/${userEmail}`);
      return data;
    },
    onSuccess: (data) => {
      refetch();
      toast.success('User deleted successfully');
    }
  });

  // update user role
  const handleUpdateUserRole = async (newRole, userEmail, userName) =>{
    console.log(newRole, userEmail);
    if(userEmail === user?.email) {
      return  Swal.fire({
       title: "Action not Allowed!",
       text: "You are the admin. You are not allowed to update your role",
       icon: "error"
     });
   }
    const updatedRole ={
      role: newRole
    }
    try{
      Swal.fire({
        title: "Are you sure?",
        text: `You want to make ${userName} a ${newRole} `,
        // icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
          const data = mutateAsync({updatedRole,userEmail})
          Swal.fire({
            title: "Update!",
            text: "User role has been deleted.",
            icon: "success"
          });
        }
      });

      
      
    } catch(err) {
      console.log(err);
      toast.error(err.message)
    }

  }

  // Delete user
  const handleDeleteUser = async (userEmail, userName) => {

    if(userEmail === user?.email) {
       return  Swal.fire({
        title: "Action not Allowed!",
        text: "You are the admin. You are not allowed to delete yourself",
        icon: "error"
      });
    }

    try {
      Swal.fire({
        title: "Are you sure?",
        text: `You want to delete ${userName}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(async (result) => {
        if (result.isConfirmed) {
           deleteUser(userEmail);
          Swal.fire({
            title: "Deleted!",
            text: "User has been deleted.",
            icon: "success"
          });
        }
      });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };



  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <Helmet>
          <title> ProductPioneer | Manage Users  </title>
        </Helmet>
     
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='table'>
                <thead className="">
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3  bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      #
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3  bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Email
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Role
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Make Moderator
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Make Admin
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody> 
                  {
                    users.map((user, index) => <tr className="mb-" key={user._id}>
                          
                      <td> {index+1} </td>
                      <td> {user?.name} </td>
                      <td> {user?.email} </td>
                      <td className="uppercase" > {user?.role} </td>
                      <td className=""> <button onClick={()=> handleUpdateUserRole('moderator',user?.email, user?.name)} 
                      className="btn btn-outline btn-primary"
                      disabled= {user?.role === 'moderator'}
                      >Make Moderator</button>  
                      </td>
                      <td>
                        <button 
                          onClick={() => handleUpdateUserRole('admin', user?.email, user?.name)}
                          className="btn btn-outline btn-secondary" 
                          disabled={user?.role === 'admin'}
                        >
                          Make Admin
                        </button>
                      </td>
                      <td className="text-red-500 text-3xl"> <MdDelete 
                      
                      onClick={() => handleDeleteUser(user?.email, user?.name)}
                      ></MdDelete> </td>

                    </tr>)
                  }
               </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageUsers