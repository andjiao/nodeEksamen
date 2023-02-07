<script>
      import { Link, useNavigate } from 'svelte-navigator'
      import {BASE_URL} from '../store/globals.js'

      import { user } from '../store/getUser.js'

      import * as Toastr from 'toastr'

      const navigate = useNavigate()


      async function logout()  {
        try {
          const response = await fetch(`${$BASE_URL}/users/logout`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
        }
    })

    if(response.ok){
      user.set(null)
     localStorage.removeItem("user")  
    navigate('/', {replace:true} )
          
    } else {
      const json = await response.json()
    Toastr.warning(json.message)
    }
  
} catch {
    Toastr.error('Could not logout.')
}
}

</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <Link class="navbar-brand" to="/">
        SGE
    </Link>

   
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    
    <div class="navbar-nav">
      {#if !$user}
      <Link class="nav-item nav-link" to="/signin">
        Signin
      </Link>
      <Link class="nav-item nav-link" to="/login">
        Login
      </Link>
     
      {:else if $user.isEvil === false} 
      <Link class="nav-item nav-link" to="/goodStudents">
        Good Students
      </Link> 
      <form class="form-inline">
        <button class="btn btn-outline-secondary" on:click={logout} >Logout</button>
      </form>
      
      {:else if $user.isEvil === true}
      <Link class="nav-item nav-link" to="/evilStudents">
        Evil Students
      </Link> 
      <form class="form-inline">
        <button class="btn btn-outline-secondary" on:click={logout} >Logout</button>
      </form>

      {/if}
    </div> 
</div>

</nav>
