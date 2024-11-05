import React, { useState } from 'react';
import '../Stylesheets/Login.css'; // Asegúrate de tener un archivo CSS correspondiente
import logo from '../img/ZEP.png'; // Reemplaza require con import

const LoginRegister = () => {
  const [swapActive, setSwapActive] = useState(false);

  const swap = () => {
    setSwapActive(prevState => !prevState);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const data = {
      id: e.target.id.value,
      username: e.target.username.value,
      direccion: e.target.direccion.value,
      email: e.target.email.value,
      telefono: e.target.telefono.value,
      password: e.target.password.value,
    };

    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message); // Muestra el mensaje de éxito
    } else {
      alert('Error al registrar usuario');
    }
  };

  return (
    <div className={`log ${swapActive ? 'active' : 'inactive'}`}>
      {/* Formulario de inicio de sesión */}
      <div className={`login ${swapActive ? 'hidden' : ''}`}>
        <form onSubmit={registerUser}>
          <img src={logo} alt="Logo" />
          <span>login to continue...</span>
          <input type="text" id="username" name="username" placeholder="Username" required /><br />
          <input type="password" id="password" name="password" placeholder="Password" required /><br />
          <a href="/forgot-password">Forgot password</a>
          <button type="submit">Sign in</button><br /><br />
        </form>
      </div>
      {/* Formulario de registro */}
      <div className={`register ${swapActive ? '' : 'hidden'}`}>
        <form className="registrarte" onSubmit={registerUser}>
          <span>register to continue...</span>
          <input type="number" id="id" name="id" placeholder="Cedula" required />
          <input type="text" id="username" name="username" placeholder="Username" required />
          <input type="text" id="direccion" name="direccion" placeholder="Direccion" required />
          <input type="email" id="email" name="email" placeholder="Email" required />
          <input type="text" id="telefono" name="telefono" placeholder="Telefono" required />
          <input type="password" id="password" name="password" placeholder="Password" required />
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" required />
          <button type="submit">Sign up</button>
        </form>
      </div>
      {/* Panel de mensajes para el cambio de vista */}
      <div className="Slide">
        <div className="panel">
          <div className="swich left">
            <h1>Thank you for joining us!</h1>
            <p>Please enter the required information </p>
            <p>to create your user account.</p>
            <img src={logo} alt="Logo" />
            <p>If you already have a user, press the button.</p>
            <button className="hidden" id="login" onClick={swap}>Sign In</button>
          </div>
          <div className="swich right">
            <h1>Welcome back!</h1>
            <p>If you don't have an account with us yet, </p>
            <p>we cordially invite you to become </p>
            <p> part of our community.</p>
            <button className="hidden" id="register" onClick={swap}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;

