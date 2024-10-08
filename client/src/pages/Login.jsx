import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInInitiate, signInSuccess, signInFailure } from '../toolkit/user/userSlice';
import OAuth from '../assets/components/OAuth';

function Login() {
  const [formData, setFormData] = useState({});

  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      dispatch(signInFailure('Please fill out all the fields'));
    }
    try {
      dispatch(signInInitiate());
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col justify-center gap-5 md:flex-row md:items-center'>
        {/* Left */}
        <div className='flex-1'>
          <div className='flex flex-col items-center'>
            <span>
              <img src="/logo.png" alt="logo" className='h-[130px] w-[250px]' />
            </span>
            <p className='text-md mt-5 font-serif font-semibold'>
              Login with you email and password or with Google.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'
            onSubmit={handleSubmit}
          >
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='**********'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : ('Login')
              }
            </Button>
            {/* OAuth */}
            <OAuth />
          </form>
          <div className='flex gap-2 mt-5 text-sm'>
            <span>Don't have an account?</span>
            <Link to='/signup' className='text-blue-600'>
              Sign Up
            </Link>
          </div>

          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }

        </div>
      </div>
    </div>
  )
}

export default Login