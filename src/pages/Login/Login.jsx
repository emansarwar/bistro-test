import { useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
// import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const captchaRef = useRef(null);
    useEffect( ()=>{
        loadCaptchaEnginge(6); 
    }, [])

    const handleValidateCaptcha = () =>{
       const user_captcha_value = captchaRef.current.value;

       if (validateCaptcha(user_captcha_value)) {
        
        setDisabled(false)
       }

       else {
           setDisabled(true);
       }
    }

    const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

    }
    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
  {/* <div className="hero-content flex-col lg:flex-row-reverse"> */}
    <div className="text-center lg:w-1/2 lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    {/* <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100"> */}
    <div className="card lg:w-1/2 md:w-1/2 max-w-md shadow-4xl bg-base-100">
      <form className="card-body" onSubmit={handleLogin}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
          <LoadCanvasTemplate />
          </label>
          <input type="text" name="captcha" ref={captchaRef} placeholder="Type Captcha" className="input input-bordered" required />
          <button onClick={handleValidateCaptcha} className="btn btn-outline btn-info btn-xs mt-2">Validate</button>
          
        </div>
        <div className="form-control mt-6">
          {/* <button className="btn btn-primary">Login</button> */}
          <input disabled={disabled} className="btn btn-primary" type="submit" value="login" />
        </div>
      </form>
    </div>
  </div>
</div>
    );
};

export default Login;