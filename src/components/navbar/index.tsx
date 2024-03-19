'use client'
import React, { useState, useEffect } from 'react'
import styles from './style.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

interface LinkItem {
    href: string;
    label: string;
}

type RouteDestinationMap = {
    [key: string]: string;
};


const Navbar = () => {
    const pathname = usePathname()
    const [scroll, setScroll] = useState<boolean>(false);
    const [destination, setDestination] = useState<string>('');

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        })
    }, [])

    useEffect(() => {
        const pathToDestination: RouteDestinationMap = {
            '/': 'home',
            '/about': 'about',
            '/services': 'services',
            '/news': 'news',
            '/contact': 'contact',
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




    return (
        <nav className={styles.navbar}>
            <header className={styles.navbar__container}>
                <div className={styles.logo}>
                    <Link href="/">
                        <Image
                            src="/logo2.png"
                            alt="logo"
                            width={100}
                            height={100}
                        />
                    </Link>
                </div>
                <ul className={styles.links}>
                    {links.map(link => (
                        <li key={link.href}>
                            <Link href={link.href}  className={pathname === link.href ? styles.activeLink : ''}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </header>
        </nav>
    )
}

export default Navbar