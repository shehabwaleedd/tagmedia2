'use client'
import React, { useState, useEffect } from 'react'
import styles from './style.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Nav from "./nav"
import { AnimatePresence } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { HiOutlineMenuAlt3 } from "react-icons/hi";

interface LinkItem {
    href: string;
    label: string;
}

type RouteDestinationMap = {
    [key: string]: string;
};


const Navbar = () => {
    const pathname = usePathname()
    const [destination, setDestination] = useState<string>('');
    const [menuOpened, setMenuOpened] = useState<boolean>(false);
    const { isLoggedIn } = useAuth()

    const toggleMenu = () => {
        setMenuOpened(!menuOpened)
    }

    useEffect(() => {
        const pathToDestination: RouteDestinationMap = {
            '/': 'home',
            '/about': 'about',
            '/services': 'services',
            '/news': 'news',
            '/news/': 'news',
            '/contact': 'contact',
            '/account': 'account',
        };
        setDestination(pathToDestination[pathname] || '');
    }, [pathname]);

    const links = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/services", label: "Services" },
        { href: "/news", label: "News" },
        { href: "/contact", label: "Contact" },
    ];

    if (isLoggedIn) {
        links.push({ href: "/account", label: "Account" });
    }
    

    useEffect(() => {
        setMenuOpened(false)
    }, [pathname])

    useEffect(() => {
        if (menuOpened) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [menuOpened])




    return (
        <nav className={styles.navbar}>
            <header className={styles.navbar__container}>
                <div className={styles.logo}>
                    <Link href="/">
                        <Image
                            src="/logo2.png"
                            alt="logo"
                            width={50}
                            height={50}
                        />
                        <h2>Tag Media</h2>
                    </Link>
                </div>
                <ul className={styles.links}>
                    {links.map(link => (
                        <li key={link.href} >
                            <Link href={link.href} className={pathname === link.href ? styles.activeLink : ''}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className={styles.hamburger} onClick={toggleMenu}>
                    <HiOutlineMenuAlt3 />
                </div>
                <AnimatePresence mode="wait">
                    {menuOpened && <Nav setMenuOpened={setMenuOpened} />}
                </AnimatePresence>
            </header>
        </nav>
    )
}

export default Navbar