import { useState } from "react";

export default function Login() {
  const [data, setData] = useState({email:'', password:''});
  const [didEdit, setDidEdit] = useState({email: false, password: false});
  const emailIsInvalid = didEdit.email && !data.email.includes('@');  
  
  function handleSubmit(e) {
    e.preventDefault();
    console.log(data.email, data.password)
  }

  function handleInputChange(identifier, value) {
    setData(prev => ({...prev, [identifier]: value}));
    setDidEdit(prev => ({ ...prev, [identifier]: false }))
  }

  function handleInputBlur(identifier) {
    setDidEdit((prev)=>({...prev, [identifier]: true}));
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" value={data.email} onBlur={()=>handleInputBlur('email')} onChange={(e)=>handleInputChange('email', e.target.value)} />
          <div className="control-error">{emailIsInvalid && <p>Please enter a valid email</p>}</div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" value={data.password} onBlur={() => handleInputBlur('password')} onChange={(e) => handleInputChange('password', e.target.value)} />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
