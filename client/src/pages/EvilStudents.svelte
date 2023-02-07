<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" >
</svelte:head>

<script>
  import {BASE_URL} from "../store/globals.js"
  import {user} from '../store/getUser.js'
  import * as Toastr from 'toastr'
  
import { Router,Link, useNavigate } from 'svelte-navigator';
const navigate = useNavigate()

if(!$user) {
        navigate('/')
    }

let evilStudents = []
$:totalEvils = evilStudents.length;

  
    async function fetchEvilStudents() {

        try {
          const response = await fetch(`${$BASE_URL}/EvilStudents`)
          if(response.ok) {
            const result = await response.json();
            $user.id = result.userid
            evilStudents = result;
            } else {
                const data = await response.json()
                Toastr.warning(data.message)
            }
        } catch (error) {
         Toastr.error('Could not get Students.')
          
        }
    }

    async function deleteEvil(id) {

        try {
            const response = await fetch(`${$BASE_URL}/evilStudents/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })

            if (!response.ok) {
                const json = await response.json()
                Toastr.warning(json.message)
                return
            } else{
              evilStudents = evilStudents.filter(evil => evil.id != id)
            }

            
        } catch (error){
            Toastr.error('Could not delete student')
	    }
      return evilStudents;

    }
   
  export async function getEvil(evilId) {
    try {
        const response = await fetch(`${$BASE_URL}/evilStudents/${evilId}`, {
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            const result = await response.json()
            const evilId = result._id
            navigate(`/evilUpdate/${evilId}`,{replace:true})
            
           
        } else {
            Toastr.warning('Unable to get student.')
        }
    } catch (error) {
      console.log(error)
        Toastr.error('Unable to get student')
    }
}
    fetchEvilStudents()

    let searchedEvil;

    $: searchedEvils = searchedEvil ? search : evilStudents;

$: search = evilStudents.filter((evil) =>
    evil.name.toLowerCase().includes(searchedEvil) 
    || evil.weapon.toLowerCase().includes(searchedEvil) 
    || evil.yourVictime.toLowerCase().includes(searchedEvil) 

);


  
</script>

<div>
<br>

<form class="form-inline my-2 my-lg-0">
  <h3>There are {totalEvils} of Evils in this school</h3>
  <br>
    <Router primary={false}>
        <Link class ="btn btn-outline-success" to="/evilForm">
          <i class="mi mi-add"><span class="u-sr-only">Ceate Evil</span></i> 
        </Link>
    </Router>
  </form>
  <br>
  <input type="text" placeholder="Search" bind:value={searchedEvil}/>
  {#if evilStudents.length && searchedEvils.length > 0}
  <br>
  <table class="table"> 
    <thead> 
      <tr>
      <th>Name</th>
        <th>Weapon</th>
        <th>who the student is tutoring</th>
      
      </tr>
    </thead>
    <tbody>
        {#each evilStudents && searchedEvils as evil} 
        <tr>
          <td>{evil.name}</td>
          <td>{evil.weapon}</td>
          <td>{evil.yourVictime}</td>

          <td>
            <form action="/evilStudents">
              <button type="submit" id="deleteEvil" class="btn btn-outline-danger btn-sm" on:click={(_id)=> deleteEvil(evil._id)}>
                <i class="mi mi-delete"><span class="u-sr-only"></span></i> 
              </button>
            </form> 
          </td>
          <td>
        
                <button id="updateEvil" class="btn btn-outline-info btn-sm" on:click={(_id)=> getEvil(evil._id)}>
                  <i class="mi mi-edit-alt"><span class="u-sr-only"></span></i> 
                  
                </button>
          </td>

        </tr> 
        {/each}     

        </tbody>
        </table>
        {:else}
        <h1 class="text-center text-muted my-3">No Evils found</h1>
        {/if}
              
    </div>
  