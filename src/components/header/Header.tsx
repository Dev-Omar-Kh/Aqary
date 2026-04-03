import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { Link, NavLink } from 'react-router-dom';
import useScreenSize from '../../hooks/useScreenSize';
import BurgerBtn from './BurgerBtn';

const navBarLinks = [

    {id: 1, title: 'تسجيل عميل', link: '/'},
    {id: 2, title: 'العملاء', link: '/clients'},
    {id: 3, title: 'الإشعارات', link: 'notifications'},

];

export default function Header() {

    const { width } = useScreenSize();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        if(width <= 714){
            setIsMenuOpen(prev => !prev);
        }
    }

    return <React.Fragment>

        <header className='fixed top-0 right-0 left-0 w-full py-3 co-px flex items-center justify-between bg-dark-green z-50 duration-300'>

            <Link to="/" className='w-fit h-16 block'>
                <img src={logo} alt="logo" className='h-full' />
            </Link>

            <nav
                className={`
                    max-[715px]:fixed max-[715px]:opacity-0 max-[715px]:bottom-0 max-[715px]:bg-dark-green
                    max-[715px]:top-22 max-[715px]:left-0 max-[715px]:right-0 max-[715px]:w-screen 
                    max-[715px]:-translate-y-2.5 duration-300 max-[715px]:z-40 max-[715px]:invisible
                    ${isMenuOpen ? 'max-[715px]:translate-y-0 max-[715px]:opacity-100 max-[715px]:visible' : ''}
                `}
                onClick={toggleMenu}
            >

                <ul className='nav-bar flex items-center gap-2.5 max-[715px]:flex-col max-[715px]:w-full max-[715px]:py-5 max-[715px]:px-[4.5%]'>

                    {navBarLinks.map(link => 
                        <NavLink 
                            key={link.id} to={link.link}
                            className='
                                px-4 py-1.5 rounded-lg font-semibold text-white text-lg 
                                hover:bg-green hover:text-black duration-300
                                max-[715px]:w-full max-[715px]:text-center
                            '
                        >
                            <li>{link.title}</li>
                        </NavLink>
                    )}

                </ul>

            </nav>

            <button
                onClick={toggleMenu}
                className="hidden flex-col items-center justify-center gap-1.5 p-2 cursor-pointer max-[715px]:flex max-[715px]:w-fit"
                aria-label="Toggle menu"
            >
                <BurgerBtn isMenuOpen={isMenuOpen} />
            </button>

        </header>

    </React.Fragment>

}
