import { Link } from 'react-router-dom';
import { useDeleteUserMutation, useGetUsersQuery } from '../../features/api/apiSlice';
import Swal from 'sweetalert2'

export default function UserList(){

    /** Obtiene el estado de una variable con Redux */
    // const users = useSelector(state => state.users)
    const { data: users, isLoading, isError, error } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const handleDelete = (user) => {
        Swal.fire({
            title: `¿Estas seguro que deseas eliminar el Usuario ${user.name} ${user.lastName}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar"
          }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(user._id)              
            }
          });
    }
    
    if (isLoading) return <div role="status" className='flex justify-center'>
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>;
    else if(isError) return (<div>Error: {error.message} </div>)

    return (
        <div className="flex justify-center">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only"></span>
                            </th>   
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">LastName</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Idetification</th>
                            {/* <th scope="col" className="px-6 py-3">Avatar</th> */}
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
            <tbody>
                {users.map(user => (
                <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <img className="w-10 h-10 rounded-full transition-transform duration-1000 transform hover:scale-150 max-w-none" 
                        src={`http://localhost:3000/${user.avatar}`} alt="Jese image"/>
                    </th>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.lastName}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.id}</td>
                    {/* <td className="border-y-2 px-4 py-2 border-indigo-600">
                        <img className="size-40 transition-transform duration-1000 transform hover:scale-110 max-w-none"
                            src={`http://localhost:3000/${user.avatar}`}/>
                    </td> */}

                    <td className="px-6 py-4">
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                        <Link to={`/user/${user._id}`}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            Edit
                        </Link>                        
                        <button type="button" onClick={() => {handleDelete(user)}}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                        >
                            Delete
                        </button>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
        </div>
        </div>
    )
}