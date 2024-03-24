import styles from './page.module.css'
import Link from 'next/link'
import axios from "axios"
import Button from '@mui/material/Button';

const Login = ({ tokenInfo }) => {

  const logout = async () => {
    const res = await axios.get('/api/logout')
    if (res.data.code == 200)
      location.reload()
  }

  const LoginComponent = () => (
    <Link className={styles.loginLink} href='/login'>
      Login / SignUp
    </Link>
  )
  const LogOutComponent = () => (
    <div className={styles.loginLink}>
      <Button onClick={logout}>
        LogOut
      </Button>
    </div>
  )

  if (tokenInfo?.role != "guest")
    return <LogOutComponent />
  return <LoginComponent />
}
export default Login