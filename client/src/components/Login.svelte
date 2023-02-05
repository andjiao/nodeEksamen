<script>
      import { Router, Link, useNavigate } from 'svelte-navigator'
      import {BASE_URL} from '../store/globals.js'
      import { user } from '../store/getUser.js'
      import * as Toastr from "toastr"

      const navigate = useNavigate()

      if($user) {
        navigate('/')
    }

    let emailInput = ''
    let passwordInput = ''
  
    async function login(){
        const body = {
            name:"",
            email: emailInput,
            password: passwordInput,
            isEvil:"",
            id:""
        }

        try {
            const response = await fetch(`${$BASE_URL}/users/login`,{
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)

            })
            if (!response.ok) {
                const json = await response.json()
                Toastr.warning(json.message)
                return
            }
            const input = await response.json()
            user.set(input.data)
            localStorage.setItem("user", JSON.stringify($user))
            navigate('/home', { replace: true })

        } catch (error) {
            Toastr.error('Could not login')
            
        }
    }

</script>
<div>
    <br>
    <h1>Login</h1>
    <br>

<form action="/login" method="POST" id="loginForm" on:submit|preventDefault={login}>
    
    <label for="email">Email:</label>
    <input
    type="email"
    name="email"
    placeholder="enter your email"
    id="email"
    bind:value={emailInput}
    />
    
    <label for="password">Password:</label>
    <input
    type="password"
    name="password"
    placeholder="enter a password"
    id="password"
    bind:value={passwordInput}
/>

<button class="btn btn-primary" on:click={login}>Login</button>

</form>

</div>