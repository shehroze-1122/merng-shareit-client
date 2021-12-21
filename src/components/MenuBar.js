import React, { useState, useEffect, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, useLocation } from 'react-router-dom';

import { authContext } from '../context/AuthContextProvider';

const MenuBar = ()=> {
  
  const location = useLocation();
  const { user, logout } = useContext(authContext);

  let iPath =  location.pathname==='/'?'home': location.pathname.substring(1);

  const [ activeItem, setActiveItem ] = useState(iPath);

  useEffect(()=>{
    setActiveItem(iPath);
  }, [iPath])
    
  const handleItemClick = (e, { name }) => setActiveItem(name)


    return (
        <Menu pointing secondary size='massive' color='green' className='menu-bar' >
        <Menu.Item
            name={user? user.username:'home'}
            active={user? true: activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to='/'
        />
        <Menu.Menu position='right'>
        
        {user?(
          <Menu.Item
            name='logout'
            onClick={logout}
            />
            ):(
          <>
            <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to='/login'
            />
            <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to='/register'
            />
          </>
        )}

        </Menu.Menu>
  
      </Menu>
  
    )
}

export default MenuBar;