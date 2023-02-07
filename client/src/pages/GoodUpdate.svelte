<script>
     import { BASE_URL } from "../store/globals.js"
     import { useNavigate } from 'svelte-navigator';
   
    import * as Toastr from "toastr" 
    
    const navigate = useNavigate()
    
        const url = document.URL;
        const lastSegment = url.split("/").pop();
        const goodId = lastSegment

        let good ={};
  
        let nameInput =""
        let abilitiesInput=""
        let whoToHelpInput=""
        
        
    async function getGood() {
    try {
        const response = await fetch(`${$BASE_URL}/goodStudents/${goodId}`, {
            headers: { 'Content-Type': 'application/json' }
        })
       if (response.ok) {
                const result = await response.json()
                good = result
              
        

            } else {
                Toastr.warning('could not get students.')
            }    
        
    } catch (error) {
        Toastr.error('failed to get student')
    }
    return good;
    
}


async function updateGood(){

  const body = {
            name: nameInput,
            abilities: abilitiesInput,
            whoToHelp: whoToHelpInput,
        }
        try {
            const response = await fetch(`${$BASE_URL}/goodStudents/${goodId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            const json = await response.json()
            Toastr.warning(json.message)
            return
        } else{
          Toastr.success('Student Updated.')
          navigate(`/goodStudents`,{replace:true})

        }
          
        } catch  {
            Toastr.error('Could not update')
            return
        }
}

getGood()

</script>

<div>
  <br>
  <h2>Update good</h2>
  <br>

  <form id="updateGoodForm" method="PUT" on:submit|preventDefault={updateGood}>
      <div class="name">
          <label for="name">Name</label>
          <br>
          <input type="text" name="name" id="name" bind:value={nameInput} placeholder={good.name}>
      </div>
      <br>
      <div class="abilities">
          <label for="abilties">what is your abilties?</label>
          <br>
          <input type="text" name="abilties" id="abilities" bind:value={abilitiesInput} placeholder={good.abilities}>
      </div>
      <br>
      <div class="whoToHelp">
          <label for="whoToHelp">who do you want to help?</label>
          <br>
          <input type="text" name="whoToHelp" id="whoToHelp" bind:value={whoToHelpInput} placeholder={good.whoToHelp}>
      </div>
      <br>  
  </form>
  <div>
      <button class="btn btn-primary" on:click={updateGood}>Update</button>
  </div>
</div>




