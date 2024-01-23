import React, { useState,lazy, Suspense } from 'react';
const Email = lazy(()=>import("../components/login_register/Email"));
const RegisterPage = lazy(()=>import('../components/login_register/Regester'));

function Register({baseURL, logo}) {
    const [showEmail, setShowEmail] = useState(true);
    const [showRegister, setShowRegister] = useState(false);
  return (
    <>
    <Suspense fallback={<p>Loading...</p>}>
    {showEmail && (<Email baseURL = {baseURL} setShowEmail={setShowEmail} setShowRegister={setShowRegister}  logo = {logo}/>)}
    {showRegister && (<RegisterPage baseURL = {baseURL} setShowRegister = {setShowRegister} logo = {logo}/>)}
    </Suspense>
    </>
    )
}

export default Register