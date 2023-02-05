<script>
    import { BASE_URL } from "../store/globals.js"
    import { useNavigate } from 'svelte-navigator';
  
   import * as Toastr from "toastr" 
   
   const navigate = useNavigate()
   
       const url = document.URL;
       const lastSegment = url.split("/").pop();
       const userId = lastSegment

       let user ={};
 
       let nameInput =""
       let emailInput =""
       let isEvilInput =""
      
       
       
       
   async function getUser() {
   try {
       const response = await fetch(`${$BASE_URL}/users/${userId}`, {
           headers: { 'Content-Type': 'application/json' }
       })
      if (response.ok) {
               const result = await response.json()
               user = result
             
       

           } else {
               Toastr.warning('could not get students.')
           }    
       
   } catch (error) {
       Toastr.error('failed to get student')
   }
   return user;
   
}


async function updateUser(){

 const body = {
           name: nameInput,
           email: emailInput,
           isEvil: isEvilInput,
           
       }
       try {
           const response = await fetch(`${$BASE_URL}/users/${userId}`, {
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
         navigate(`/users`,{replace:true})

       }
         
       } catch  {
           Toastr.error('Could not update')
           return
       }
}

getUser()

</script>

<div>
 <br>
 <h2>Update user</h2>
 <br>

 <form id="updateUserForm" method="PUT" on:submit|preventDefault={updateUser}>
     <div class="name">
         <label for="name">Name</label>
         <br>
         <input type="text" name="name" id="name" bind:value={nameInput} placeholder={user.name}>
     </div>
     <br>
     <div class="email">
         <label for="email">Email</label>
         <br>
         <input type="text" name="email" id="email" bind:value={emailInput} placeholder={user.email}>
     </div>
     <br>
     <div class="isEvil">
         <label for="isEvil">Evil?</label>
         <br>
         <input type="text" name="isEvil" id="isEvil" bind:value={isEvilInput} placeholder={user.isEvil}>
     </div>
     <br>
 </form>
 <div>
     <button class="btn btn-primary" on:click={updateUser}>Update</button>
 </div>
</div>




