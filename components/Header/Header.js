import { useState, useEffect } from 'react'
import Logo from './Logo'
import {
  SearchIcon,
  MenuIcon,
  CreditCardIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/outline'
import { UserCircleIcon } from '@heroicons/react/solid'
import SearchInput from './SearchInput'
import NavMenus from './NavMenus'
import Link from 'next/link'
import { useTheme } from 'next-themes'

function Navbar() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { systemTheme, theme, setTheme } = useTheme()

  const renderThemeChanger = () => {
    if (!mounted) return null

    const currentTheme = theme === 'system' ? systemTheme : theme

    if (currentTheme === 'dark') {
      return (
        <MoonIcon
          className='h-8 w-8 cursor-pointer text-gray-600 transition-all hover:text-black dark:text-gray-300'
          role='button'
          onClick={() => setTheme('light')}
        />
      )
    } else {
      return (
        <SunIcon
          className='h-8 w-8 cursor-pointer text-gray-600 transition-all hover:text-black dark:text-gray-300'
          role='button'
          onClick={() => setTheme('dark')}
        />
      )
    }
  }

  const menus = [
    {
      name: 'Explore',
      href: '#',
    },
    {
      name: 'Listings',
      href: 'https://thirdweb.com/mumbai/0xc6eBee784abADA9e98de65D4A2e621D306931049/listings',
    },
    {
      name: 'Mint',
      href: 'https://thirdweb.com/mumbai/0x13F3D1D8b12a146740d5332B943b7117634029C5/nfts',
    },
  ]

  return (
    <header className='sticky top-0 z-50 bg-white px-4 py-2 shadow-md dark:bg-gray-900'>
      <div className='flex items-center justify-between space-x-6'>
        <div className='xl:pr-40'>
          <Link href='/'>
            <a>
              <Logo />
            </a>
          </Link>
        </div>

        <div className='ml-8 hidden flex-1 sm:block'>
          <SearchInput />
        </div>

        <div className='hidden pr-6 lg:block xl:pl-8'>
          <NavMenus menus={menus} />
        </div>

        <div className='flex items-center space-x-6'>
          <a href='https://testnets.opensea.io/account'>
          <UserCircleIcon className='hidden h-8 w-8 cursor-pointer text-gray-600 transition-all hover:text-black dark:text-gray-300 hover:dark:text-white lg:block' />
          </a>
          <a href='https://mumbai.polygonscan.com/address/0xdf7fcafc4bf002f5ea9b234f014c961925216631'>
          <CreditCardIcon className='hidden h-8 w-8 cursor-pointer text-gray-600 transition-all hover:text-black dark:text-gray-300 hover:dark:text-white lg:block' />
          </a>
          {renderThemeChanger()}
          <SearchIcon className='h-7 w-7 cursor-pointer text-gray-600 transition-all hover:text-black dark:text-gray-300 hover:dark:text-white sm:hidden' />
          <MenuIcon className='h-8 w-8 cursor-pointer text-gray-600 transition-all hover:text-black dark:text-gray-300 hover:dark:text-white lg:hidden' />
        </div>
      </div>
    </header>
  )
}

export default Navbar