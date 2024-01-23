import LoginPage from '../components/login_register/Login';
import { Helmet } from 'react-helmet'
function Login({ baseURL, logo }) {
  const titlePage = "Login";
  return (
    <>
    <Helmet>
      <title>{titlePage}</title>
      <meta name="description" content="Login Page"/>
    </Helmet>
      <LoginPage baseURL={baseURL} logo={logo} />
    </>
  )
}

export default Login