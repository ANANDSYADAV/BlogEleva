import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../toolkit/theme/themeSlice';

function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  return (
    <Navbar className='border-b-2'>
      <Link>
        <span><img src="/logo.png" alt="logo.img" className='h-[50px] w-[110px]' /></span>
      </Link>
      <form>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button className='h-10 w-12 flex items-center lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        {/* Theme Switch Functionality */}
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
          {
            theme === 'light' ?
              <FaSun /> : <FaMoon />
          }
        </Button>

        <Link to={!currentUser ? '/signup' : null}>
          {
            currentUser ?
              (
                <Dropdown arrowIcon={false} inline label={
                  <Avatar
                    alt='user'
                    img={currentUser.profilePicture}
                    rounded
                  />
                }>
                  <Dropdown.Header>
                    <span className='block text-sm'>@{currentUser.username}</span>
                    <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                  </Dropdown.Header>
                  <Link to={'/dashboard?tab=profile'}>
                    <Dropdown.Item>Profile</Dropdown.Item>
                  </Link>
                  <Dropdown.Divider />
                  <Dropdown.Item>Log Out</Dropdown.Item>
                </Dropdown>
              )
              :
              (
                <Button gradientDuoTone='purpleToBlue' outline>
                  Sign Up
                </Button>
              )
          }
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as='div'>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as='div'>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/creator'} as='div'>
          <Link to='/creator'>Creator</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header