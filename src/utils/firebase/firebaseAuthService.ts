import  { GoogleAuthProvider, signInWithRedirect, onAuthStateChanged, User, signOut } from 'firebase/auth'
import { auth } from './firebaseService'

export async function login() {
    const provider = new GoogleAuthProvider()
    provider.addScope('profile')
    provider.addScope('email')
    await signInWithRedirect(auth, provider)
}

export async function logOut() {
    signOut(auth)
}

export function onAuthChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback)
}
