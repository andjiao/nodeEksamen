<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" >
</svelte:head>

<script>
  import {BASE_URL} from "../store/globals.js"
  import {user} from '../store/getUser.js'
  import * as Toastr from 'toastr'
  
import { useNavigate } from 'svelte-navigator';
const navigate = useNavigate()

if($user?.isEvil !== true) {
        const navigate = useNavigate()

        navigate('/home')
    }

let users = []
$:totalUsers = users.length;

  
    async function fetchUsers() {

        try {
          const response = await fetch(`${$BASE_URL}/users`)
          if(response.ok) {
            const result = await response.json();
            $user.id = result.userid
            users = result;
            } else {
                const data = await response.json()
                Toastr.warning(data.message)
            }
        } catch (error) {
         Toastr.error('Could not get users.')
          
        }
    }

    async function deleteUser(id) {

        try {
            const response = await fetch(`${$BASE_URL}/users/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })

            if (!response.ok) {
                const json = await response.json()
                Toastr.warning(json.message)
                return
            } else{
              users = users.filter(user => user.id != id)
            }

            
        } catch (error){
            Toastr.error('Could not delete user')
	    }
      return users;

    }
   
  export async function getUser(userId) {
    try {
        const response = await fetch(`${$BASE_URL}/users/${userId}`, {
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            const result = await response.json()
            const userId = result._id
            navigate(`/userUpdate/${userId}`,{replace:true})
            
           
        } else {
            Toastr.warning('Unable to get user.')
        }
    } catch (error) {
      console.log(error)
        Toastr.error('Unable to get user')
    }
}

    fetchUsers()

    let searchedUser;

    $: searchedUsers = searchedUser ? search : users;

$: search = users.filter((user) =>
    user._id.toLowerCase().includes(searchedUser) 
    ||user.name.toLowerCase().includes(searchedUser) 
    || user.email.toLowerCase().includes(searchedUser) 
   
);


  
</script>

<div>
<br>

<form class="form-inline my-2 my-lg-0">
  <h3>There are {totalUsers} of Users in this school</h3>
  <br>

  </form>
  <br>
  <input type="text" placeholder="Search" bind:value={searchedUser}/>
  {#if users.length && searchedUsers.length > 0}
  <br>
  <table class="table"> 
    <thead> 
      <tr>
      <th>Id</th>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
        {#each users && searchedUsers as user} 
        <tr>
          <td>{user._id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td> <i class="mi mi-favorite"><span class="u-sr-only"></span></i> </td>

          <td>
            <form action="/users">
              <button type="submit" id="deleteuser" class="btn btn-outline-danger btn-sm" on:click={(_id)=> deleteUser(user._id)}>
                <i class="mi mi-delete"><span class="u-sr-only"></span></i> 
              </button>
            </form> 
          </td>
          <td>
        
                <button id="updateuser" class="btn btn-outline-warning btn-sm" on:click={(_id)=> getUser(user._id)}>
                  <i class="mi mi-edit-alt"><span class="u-sr-only"></span></i> 
                  
                </button>
          </td>

        </tr> 
        {/each}     

        </tbody>
        </table>
        {:else}
        <h1 class="text-center text-muted my-3">No User found</h1>
        {/if}
              
    </div>
  