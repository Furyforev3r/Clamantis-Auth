'use client'

import styles from './page.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import { login, logOut, onAuthChanged } from '@/utils/firebase/firebaseAuthService'

export default function Home() {

  const [user, setUser] = useState<User | null>()
  const [loginState, setLoginState] = useState<String>('...')
  const [btnLoginState, setBtnLoginState] = useState<any>('Login')


  async function handleLogin() {
    login()
      .then((user) => {
        console.log(user)
      })
      .catch((err) => alert(err))
  }

  useEffect(() => {
    function userExist() {
      onAuthChanged((user) => {
        if (user) {
          setLoginState('Logged')
          setBtnLoginState('Change Account')
          setUser(user)
        } else {
          setLoginState('Unlogged')
          setBtnLoginState('Login')
          setUser(user)
        }
      })
    }

    return userExist()
  }, [user])

  const UserPhotoURL: any = user?.photoURL
  const UserDisplayName: any = user?.displayName
  const UserEmail: any = user?.email

  return (
    <main className={styles.main}>
      <div className={styles.LoginContainer}>
        <form className={styles.form} onSubmit={(e) => { e.preventDefault() ; handleLogin() }}>
          <input type="submit" className={styles.btn} value={btnLoginState}/>
        </form>
        <p className={styles.txt}>Status de login: <span>{loginState}</span></p>
        <form className={styles.form} onSubmit={(e) => logOut()}>
          <input type="submit" className={styles.btn} value={'Log Out'}/>
        </form>
      </div>
      { loginState == 'Logged' &&
        <div className={styles.Account}>
          <Image height={50} width={50} src={UserPhotoURL} alt={UserDisplayName} />
          <p>User: {UserDisplayName}</p>
          <p>Email: {UserEmail}</p>
        </div>
      }
    </main>
  )
}
