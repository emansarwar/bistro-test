import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    console.log('state in the location login page', location.state)

    const {signIn} = useContext(AuthContext);

    useEffect( ()=>{
        loadCaptchaEnginge(6); 
    }, [])

    const handleValidateCaptcha = (e) =>{
       const user_captcha_value = e.target.value;

       if (validateCaptcha(user_captcha_value)) {
        
        setDisabled(false)
       }

       else {
           setDisabled(true);
       }
    }

    const handleLogin = event => {
      event.preventDefault();
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;
      console.log(email, password);
      signIn(email, password)
          .then(result => {
              const user = result.user;
              console.log(user);
              Swal.fire({
                  title: 'User Login Successful.',
                  showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                  }
              });
              navigate(from, { replace: true });
          })
  }
    return (
        <>
        <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
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
          <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="Type Captcha" className="input input-bordered" required />
          <button className="btn btn-outline btn-info btn-xs mt-2">Validate</button>
          
        </div>
        <div className="form-control mt-6">
          {/* <button className="btn btn-primary">Login</button> */}
          <input disabled={disabled} className="btn btn-primary" type="submit" value="login" />
        </div>
      </form>
      <p><small>New Here? <Link to="/signup">Creat an account</Link></small></p>
    </div>
  </div>
</div>
        </>
    );
};

export default Login;