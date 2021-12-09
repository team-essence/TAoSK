import firebase from 'firebase/compat/app'
import { getAuth } from 'firebase/auth'
import 'firebase/functions'
import 'firebase/storage'
import { env } from 'env/dotEnv'

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(env.getFirebaseConfig())
  : firebase.app()

firebaseApp

export const auth = getAuth()
