// // ** React Imports
// import { useEffect } from 'react'

// // ** Next Import
// import { useRouter } from 'next/router'

// // ** Hooks Import
// import { useAuth } from 'src/hooks/useAuth'




// const AuthGuard = props => {
//   const { children, fallback } = props
//   const auth = useAuth()
//   const router = useRouter()
//   useEffect(
//     () => {
//       if (!router.isReady) {
//         return
//       }
//       if (auth.user === null && !window.localStorage('userData')) {
//         if (router.asPath !== '/') {
//           router.replace({
//             pathname: '/login',
//             query: { returnUrl: router.asPath }
//           })
//         } else {
//           router.replace('/login')
//         }
//       }
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [router.route]
//   )
//   if (auth.loading || auth.user === null) {
//     return fallback
//   }

//   return <>{children}</>
// }

// export default AuthGuard
// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

// ** Secure Storage Import
import secureLocalStorage from 'react-secure-storage'
import { getSecureItem } from 'utils/localStroageService'

const AuthGuard = props => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()
  useEffect(
    () => {
      if (!router.isReady) {
        return
      }
      if (auth.user === null && !getSecureItem('userData')) {
        if (router.asPath !== '/') {
          router.replace({
            pathname: '/login',
            query: { returnUrl: router.asPath }
          })
        } else {
          router.replace('/login')
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )
  if (auth.loading || auth.user === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard