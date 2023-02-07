<script>
  import Signin from "./pages/Signin.svelte";
  import Login from "./pages/Login.svelte";
  import GoodStudents from "./pages/GoodStudents.svelte";
  import GoodForm from "./pages/GoodForm.svelte";
  import GoodUpdate from "./pages/GoodUpdate.svelte";
  
  import EvilStudents from "./pages/EvilStudents.svelte";
  //import EvilForm from "./components/EvilForm.svelte";
  //import EvilUpdate from "./components/EvilUpdate.svelte";

  import Users from "./pages/Users.svelte";
 
  import NavBar from "./pages/NavBar.svelte";
  import { Route, Router } from 'svelte-navigator'
 

  </script>
  
  <main>
    <Router>
      <NavBar></NavBar>
        <Route path="/">
          <!-- svelte-ignore a11y-img-redundant-alt -->
          
          <div id="frontpage"> </div>
         
        </Route>
        <Route path="/login"> <Login /> </Route>
        <Route path="/signin"> <Signin /> </Route>
       
        <Route primary={false} path="/goodStudents"> <GoodStudents /> </Route>
        <Route path="/goodForm"> <GoodForm/> </Route>
        <Route primary={false} path="/goodUpdate/:id"> <GoodUpdate/> </Route>

        <Route primary={false} path="/evilStudents"> <EvilStudents /> </Route>
    <!--     <Route path="/evilForm"> <EvilForm/> </Route>
        <Route primary={false} path="/EvilUpdate/:id"> <EvilUpdate/> </Route> -->


        <Route primary={false} path="/users"> <Users/> </Route>
       
    </Router>
  
  </main>

  <style>
    #frontpage{
   
      background-image: url("./store/goodAdnEVil.jpg");
      min-height: 750px;
/* Center and scale the image nicely */
background-position: center;
background-repeat: no-repeat;
background-size: cover;
opacity: 55%;

/* Needed to position the navbar */
position: relative;
}
  </style>

 