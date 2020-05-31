import React from "react";
import {CardElement, StripeProvider,Elements,injectStripe} from "react-stripe-elements";
import {CartContext} from "../context/cart"
import {UserContext} from "../context/user"
import {useHistory} from "react-router-dom";
import EmptyCart from "../components/Cart/EmptyCart"
import submitOrder from "../strapi/submitOrder"
function Checkout(props) {
  const {cart ,total,ClearCart} =React.useContext(CartContext);
  const {user,showAlert,hideAlert ,alert } =React.useContext(UserContext);
  const history = useHistory();
  //  state values
  const [name,setName] =React.useState('');
  const [error,setError] =React.useState('');
  const isEmpty =!name ||alert.show
const handleSubmit = async(e) => {
  showAlert({msg:'submitting the order please wait '})
  e.preventDefault();
  const response = await props.stripe.createToken().catch(error=>console.log(error))
  console.log(response);
  const {token} = await response;
 if (token) {
     setError('');
     const {id}=token
     let order=await submitOrder({name:name,total:total,items:cart,stripeTokenID:id,userToken:user.token});
     if (order) {

       showAlert( {msg:"order sucessfull ",type:"success"})
       ClearCart();
       history.push('/');
       return;
     }else{
       showAlert( {msg:"there was an error regarding payment of your order. pls try again ",type:"danger"})
     }

 }else{
   hideAlert();
   setError(response.error.message); 
 }
}

if(cart.length<1){
  return <EmptyCart />
}else{
  return <section className="section form ">

    <h2 className="section-title">checkout</h2>
    <form  className="checkout-form">
<h3>order total : <span>${total}</span></h3>
{/* single input */}
<div className="form-control">
  <label htmlFor="name">name </label>
  <input type="text" id="name" value={name} onChange={(e)=>{setName(e.target.value)}} />
</div>
{/* single input khatam  */}
{/* card element  */}
<div className="stripe-input">
  <label htmlFor="card-element" className="">Credit ore debit card</label>
  <p className="stripe-info">
      test using this card : <span> 4242 4242 4242 4242</span> 
      <br/>
      enter 5 digit code for zip code 
      <br/>
      enter 3 digit cvv code 
  </p>
</div>
{/* end of card */}
{/* stripe element */}
<CardElement className="card-element"></CardElement>
{/* stripe error message*/}
{
  error&& <p className="form-empty">{error}</p>
}
{/* empty value */}
{isEmpty? (<p className="form-empty">pls fill out the name field</p>) :(<button className="btn btn-primary btn-block" onClick={handleSubmit} type="submit"  >submit</button>)
}

    </form>

  </section>;

}
}

const CardForm= injectStripe(Checkout);
const StripeWrapper=()=>{
  return (
    <StripeProvider apiKey="pk_test_l1B5esWR2KzDweInhTN7YCAB00UjsRozFJ">
      <Elements>
         <CardForm>

         </CardForm>
      </Elements>
    </StripeProvider>
  )
}
export default StripeWrapper
