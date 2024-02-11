import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Logo from './logo'
import Modal from './modal'
import Search from './search'
import SearchIcon from './icons/search.svg'
import clsx from 'clsx'

export default function Navbar() {
  const ref = useRef(null)
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    console.log('Inside useEffect to check if search')
    if (searchOpen) {
      ref.current?.focus()
    } else {
      ref.current?.blur()
    }
  }, [searchOpen])

  useEffect(() => {
    console.log('Inside useEffect to check if loggedIn')
    const checkLoggedIn = async () => {
      const res = await fetch(`http://localhost:4000/v1/auth/isLoggedIn`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(cookie ? { Cookie: cookie } : {}),
        },
        credentials: 'include',
      }).then((res) => res.json())
      setLoggedIn(res.loggedIn)
    }
    if (!checkLoggedIn.loggedIn) {
      setLoggedIn(false)
    } else {
      setLoggedIn(true)
      setUserInfo(checkLoggedIn.user)
    }
  }, [])

  return (
    <header className="navbar">
      <div className="container flex items-center">
        <Link href="/" className="text-[40px]">
          <Logo />
          <span className="sr-only">CineConnect</span>
        </Link>

        <div className="search-bar flex-grow mx-40">
          <Search forwardedRef={ref} />
        </div>

        <nav className="ml-auto flex items-center">
          {!loggedIn && (
            <Link
              href="/login"
              className={clsx(
                'nav-link',
                router.pathname === '/login' && 'text-white-100'
              )}
            >
              Login
            </Link>
          )}

          {!loggedIn && (
            <Link
              href="/register"
              className={clsx(
                'nav-link',
                router.pathname === '/register' && 'text-white-100'
              )}
            >
              Register
            </Link>
          )}

          {loggedIn && (
            <button className="icon-button">
              <img
                src="/notification.png"
                alt="Notifications"
                className="icon"
              />
            </button>
          )}
          {loggedIn && (
            <button className="icon-button">
              <img src="/profile.png" alt="Profile" className="icon" />
            </button>
          )}
          {loggedIn && (
            <button className="icon-button">
              <img src="/settings.png" alt="Settings" className="icon" />
            </button>
          )}

          {/* <Link
            href="/movie"
            className={clsx(
              'nav-link',
              router.pathname === '/movie' && 'text-white-100'
            )}
          >
            Movies
          </Link> */}
          {/*
          <Link
            href="/tv"
            className={clsx(
              'nav-link',
              router.pathname === '/tv' && 'text-white-100'
            )}
          >
            TV Shows
          </Link> */}
          {/* <button
              className="ml-4 text-xl"
              onClick={() => {
                setSearchOpen(true)
                ref?.current?.focus()
              }}
            >
              <SearchIcon />
              <span className="sr-only">Search</span>
            </button> */}
        </nav>
      </div>
    </header>
  )
}
