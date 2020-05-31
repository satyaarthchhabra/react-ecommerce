import React from "react";
// strapi functions 
import loginUser from "../strapi/loginUser"
import registerUser from "../strapi/registerUser"
import submitOrder from "../strapi/submitOrder"
// handle users  
import { useHistory } from "react-router-dom";
import {UserContext} from "../context/user";




export default function Login() {
  const history = useHistory();
  // set up user context 
  const {userLogin,alert,showAlert} = React.useContext(UserContext);
  
  

  // state  values here
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('default')
  const [ismember, setIsmember] = React.useState(true);

  let isEmpty = !email || !password || !username||alert.show;
  const toggleMember = () => {
    setIsmember((prevMember) => {
      let ismember = !prevMember;
      ismember ? setUsername('default') : setUsername('')
      return ismember;


    })
  }
  const handleSubmit = async (e) => {
    // alert 
    showAlert({msg: 'acessing user data please wait for us '})
    e.preventDefault();
    let response;
    if (ismember) {
      response =await loginUser({ email,password})


    } else {
      response =await registerUser({email,password,username});


    }
    if(response){
const {jwt:token,user:{username}} = response.data
const newUser={token,username};
userLogin(newUser);
history.push("/products")
      
    }else{
      // show elert
    }
    

  }

  return <section className="form section">
    <h2 className="section-title">{ismember ? "sign in" : "register"}</h2>
    <form className="login-form">
      {/* single input  */}
      <div className="form-control">
        <label htmlFor="email">email</label>
        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      {/* end of single input is here  */}
      {/* single input  */}
      <div className="form-control">
        <label htmlFor="password">password</label>
        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      {/* end of single input is here  */}
      {/* single input  */}
      {!ismember && (<div className="form-control">
        <label htmlFor="username">username</label>
        <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
      </div>)}
      {/* end of single input is here  */}
      {/* empty form text  */}
      {isEmpty && <p className="form-empty">please fill the fields </p>}
      {/* submit btn  */}
      {!isEmpty && <button className="btn btn-block btn-primary" onClick={handleSubmit} type="submit" >submit </button>}
      {/* register link */}
      <p className="register-link">{ismember ? "need to register" : "already a member "}
        <button type="button" className="btn btn-" onClick={toggleMember} >click here</button>
      </p>


    </form>

  </section>;
}
