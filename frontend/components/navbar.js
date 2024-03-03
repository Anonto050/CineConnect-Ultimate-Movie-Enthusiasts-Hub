import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Logo from './logo'
import Modal from './modal'
import Search from './search'
import SearchIcon from './icons/search.svg'
import clsx from 'clsx'
import { FaUserFriends } from 'react-icons/fa';
import NotificationCard from './NotificationCard'; // Adjust the path as necessary


export default function Navbar() {
  const ref = useRef(null)
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [showNotifications, setShowNotifications] = useState(false);
  const [fetchedNotifications, setFetchedNotifications] = useState([]);

  const mockNotifications = [
    { id: 1, imageUrl: '/user1.png', message: 'User1 liked your post.', createdAt: '2023-03-01T09:24:00' },
    { id: 2, imageUrl: '/user2.png', message: 'User2 commented: "Amazing!"', createdAt: '2023-03-02T11:45:00' },
    // Add more notifications as needed
  ];

  useEffect(() => {
    if (searchOpen) {
      ref.current?.focus()
    } else {
      ref.current?.blur()
    }
  }, [searchOpen])

  
  useEffect(() => {
    const checkLoggedIn = async () => {
      const response = await fetch(`http://localhost:4000/v1/auth/isLoggedIn`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // ...(cookie ? { Cookie: cookie } : {}),
        },
        credentials: 'include',
      }).then((res) => res.json())
      // console.log('response', response)
      if (!response.loggedIn) {
        setLoggedIn(false)
      } else {
        setLoggedIn(true)
        setUserInfo(response.user)
      }
    }
    checkLoggedIn()
  }, [])


  useEffect(() => {
    const fetchNotifications = async () => {
      // const url = new URL('http://localhost:4000/v1/notifications'); // Adjust the domain as necessary

      const beforeTime = new Date().toISOString();
      const limit = 10;
      const offset = 0; 
      
      // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  
      try {
        // console.log('Inside navbars fetchNotifications, url:', url)
        const response = await fetch(`http://localhost:4000/v1/notifications?beforeTime=${beforeTime}&limit=${limit}&offset=${offset}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer YOUR_AUTH_TOKEN', // Replace YOUR_AUTH_TOKEN with the actual token
          },
          credentials: 'include', // Necessary if your API requires cookies to be sent
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        console.log('Inside navbars fetchNotifications, response:', response)
        setFetchedNotifications(await response.json());
        console.log('Notifications:', fetchedNotifications);

        // Set state or perform actions with the fetched notifications here
      } catch (error) {
        console.error('Failed to fetch notifications:', error.message);
      }
    }; fetchNotifications();
  }, [showNotifications])


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
          {loggedIn && <p>{userInfo.username}</p>}
          {loggedIn && (
            // <Link href="/requests">
              <a href='/requests' className="icon-button">
                <FaUserFriends style={{ color: 'black' }} className="icon" size={25} />
              </a>
            // </Link>
          )}

          <div className="notifications-container">
            <button className="icon-button" onClick={() => setShowNotifications(!showNotifications)}>
              <img src="/notification.png" alt="Notifications" className="icon" size={25} />
            </button>

            {loggedIn && showNotifications && (
              <div className="notifications-list">
                {fetchedNotifications.map(notification => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))}
              </div>
            )}
          </div>

          {loggedIn && (
            <a href={`/profile/${userInfo.username}`}>
              <button className="profile-button">
                <img src={userInfo.image_url} alt="Profile" className="profile" />
              </button>
            </a>
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
