<script>
    import { BASE_URL } from "../store/globals.js"
    import { Router, Link, useNavigate } from 'svelte-navigator'
    import { user } from '../store/getUser.js'
    import * as Toastr from "toastr" 

    const navigate = useNavigate()
    
 if(!$user) {
        navigate('/home')
    }

    let nameInput =""
    let abilitiesInput=""
    let whoToHelpInput=""
    
        async function createGood(){
            const good = {
                name: nameInput,
                abilities: abilitiesInput,
                whoToHelp: whoToHelpInput,
            }
            try {
                const response = await fetch(`${$BASE_URL}/goodStudents`,{
                method: 'POST',
                //credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(good)

                })
                if (!response.ok) {
            const json = await response.json()  
            Toastr.warning(json.message)
            return
        } else{
        const json = await response.json()
        $user.id = json.userid
        navigate('/goodStudents', { replace: true })
       
        Toastr.success(json.message)

        }
            } catch (error) {
                Toastr.error('Creation failed.')
                
            }
        }
  
    </script>
   
    <div>
        <br>
        <h1>Create good</h1>
        <br>

        <form id="createGoodForm" method="POST" on:submit|preventDefault={createGood}>
            <div class="name">
                <label for="name">Name</label>
                <br>
                <input type="text" name="name" id="name" bind:value={nameInput} required>
            </div>
            <br>
            <div class="abilities">
                <label for="abilties">what is your abilties?</label>
                <br>
                <input type="text" name="abilties" id="abilities" bind:value={abilitiesInput} required>
            </div>
            <br>
            <div class="whoToHelp">
                <label for="whoToHelp">who do you want to help?</label>
                <br>
                <input type="text" name="whoToHelp" id="whoToHelp" bind:value={whoToHelpInput} required>
            </div>
            <br>  
        </form>
        <div>
            <button class="btn btn-primary" on:click={createGood}>Create</button>
        </div>
    </div>

    
    
    
    
    