import React from "react";

export default function Hero({children}) {
return <div className="hero ">
  <div className="banner">
  <h1>think code and deploy</h1>
<p>embrace your choices -we do it </p>
{children}
  </div>
</div>;
}
