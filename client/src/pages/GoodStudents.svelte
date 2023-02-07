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

let goodStudents = []
$:totalGoods = goodStudents.length;

  
    async function fetchGoodStudents() {

        try {
          const response = await fetch(`${$BASE_URL}/goodStudents`)
          if(response.ok) {
            const result = await response.json();
            $user.id = result.userid
            goodStudents = result;
            } else {
                const data = await response.json()
                Toastr.warning(data.message)
            }
        } catch (error) {
         Toastr.error('Please login')
          
        }
    }

    async function deleteGood(id) {

        try {
            const response = await fetch(`${$BASE_URL}/goodStudents/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })

            if (!response.ok) {
                const json = await response.json()
                Toastr.warning(json.message)
                return
            } else{
              goodStudents = goodStudents.filter(good => good.id != id)
            }

            
        } catch (error){
            Toastr.error('Could not delete student')
	    }
      return goodStudents;

    }
   
  export async function getGood(goodId) {
    try {
        const response = await fetch(`${$BASE_URL}/goodStudents/${goodId}`, {
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            const result = await response.json()
            const goodId = result._id
            navigate(`/goodUpdate/${goodId}`,{replace:true})
            
           
        } else {
            Toastr.warning('Unable to get student.')
        }
    } catch (error) {
      console.log(error)
        Toastr.error('Unable to get student')
    }
}

function handleIcon(){
  // <i class="mi mi-favorite"> -- star
  // <i class="mi mi-heart"> -- star
    // select

}
    fetchGoodStudents()

    let searchedGood;

    $: searchedGoods = searchedGood ? search : goodStudents;

$: search = goodStudents.filter((good) =>
    good.name.toLowerCase().includes(searchedGood) 
    || good.abilities.toLowerCase().includes(searchedGood) 
    || good.whoToHelp.toLowerCase().includes(searchedGood) 
);


  
</script>

<div>
<br>

<form class="form-inline my-2 my-lg-0">
  <h3>There are {totalGoods} of Goods in this school</h3>
  <br>
    <Router primary={false}>
        <Link class ="btn btn-outline-success" to="/goodForm">
          <i class="mi mi-add"><span class="u-sr-only">Ceate Good</span></i> 
        </Link>
    </Router>
  </form>
  <br>
  <input type="text" placeholder="Search" bind:value={searchedGood}/>
  {#if goodStudents.length && searchedGoods.length > 0}
  <br>
  <table class="table"> 
    <thead> 
      <tr>
      <th>Name</th>
        <th>Abilities</th>
        <th>who the student is helping</th>
      </tr>
    </thead>
    <tbody>
        {#each goodStudents && searchedGoods as good} 
        <tr>
          <td>{good.name}</td>
          <td>{good.abilities}</td>
          <td>{good.whoToHelp}</td>
         
          <td>
            <form action="/goodStudents">
              <button type="submit" id="deleteGood" class="btn btn-outline-danger btn-sm" on:click={(_id)=> deleteGood(good._id)}>
                <i class="mi mi-delete"><span class="u-sr-only"></span></i> 
              </button>
            </form> 
          </td>
          <td>
        
                <button id="updateGood" class="btn btn-outline-info btn-sm" on:click={(_id)=> getGood(good._id)}>
                  <i class="mi mi-edit-alt"><span class="u-sr-only"></span></i> 
                  
                </button>
          </td>

        </tr> 
        {/each}     

        </tbody>
        </table>
        {:else}
        <h1 class="text-center text-muted my-3">No Goods found</h1>
        {/if}
              
    </div>
  