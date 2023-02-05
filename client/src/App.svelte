<script>
  import Signin from "./components/Signin.svelte";
  import Login from "./components/Login.svelte";
  import GoodStudents from "./components/GoodStudents.svelte";
  import GoodForm from "./components/GoodForm.svelte";
  import GoodUpdate from "./components/GoodUpdate.svelte";
  
  import EvilStudents from "./components/EvilStudents.svelte";
  //import EvilForm from "./components/EvilForm.svelte";
  //import EvilUpdate from "./components/EvilUpdate.svelte";

  import Users from "./components/Users.svelte";
 
  import NavBar from "./components/NavBar.svelte";
  import { Route, Router } from 'svelte-navigator'
 

  </script>
  
  <main>
    <Router>
      <NavBar></NavBar>
        <Route path="/home"> <h1>Home</h1> </Route>
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

 