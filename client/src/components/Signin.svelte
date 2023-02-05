<script>
    import { BASE_URL } from "../store/globals.js"
    import { useNavigate } from 'svelte-navigator'
    import { user } from '../store/getUser.js'
    import * as Toastr from "toastr" 

    const navigate = useNavigate()

   if ($user) {
        navigate('/')
        Toastr.info('You are already signed in.')
    } 
    

    let nameInput =""
    let emailInput =""
    let passwordInput=""
    let isEvilInput= false

    
        async function signin(){

        if (passwordInput.length <2) {
            return Toastr.warning('The length of the password needs to be longer than 2.')
        }
        
        const email = emailInput
        const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
        if (!regex.test(email)) {
            return Toastr.warning('Please enter a valid email.')
        }
            const body = {
                name: nameInput,
                email: emailInput,
                password: passwordInput,
                isEvil: isEvilInput

            }
            try {
                const response = await fetch(`${$BASE_URL}/users/signin`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)

                })
            if (!response.ok) {
            const json = await response.json()
            console.log(json.message)
            //Toastr.warning(json.message)
            return
        } else{
        const json = await response.json()
        //Toastr.success(json.message)
        navigate('/login', { replace: true })
        
        }
            } catch (error) {
            Toastr.error('Signup failed.')
                
            }
        }
  
    </script>
   
    <div>
        <br>
        <h1>Signin</h1>
        <br>

        <form id="signForm" action ="/signin" method="POST" on:submit|preventDefault={signin}>
            <label for="name">Name:</label>
            <input class = "mr-sm-2" type="text" bind:value={nameInput}  id="nameInput" name="name" required>  
            
            <label for="email">Email:</label>
            <input class = "mr-sm-2" type="email" bind:value={emailInput}  id="emailInput" name="email" required>  
                
            <label for="password">Password:</label>
            <input 
            bind:value={passwordInput} 
            type="password"
            id="signPasswordInput" 
            name="password" 
            required>
            
            <label>
                
                <input type="checkbox" bind:checked={isEvilInput}>
            </label>
        </form>
        <button class="btn btn-primary" type="submit" id="subtmit" on:click={signin}>Signin</button>
    </div>

    
    
    
    
    