import axios from "axios";

function setJwt(jwt){
    axios.defaults.headers.common['x-auth-token'] = jwt;

}
export{ setJwt }