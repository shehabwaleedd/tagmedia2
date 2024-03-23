import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { width } from '../anim';
import Body from './Body';
import Footer from './Footer';


const links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Events",
    href: "/events",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
]

export default function Index({ setMenuOpened }) {

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={width}
      className={styles.nav}>

      <div className={styles.wrapper}>
        <button className={styles.hamburger} onClick={() => setMenuOpened(false)}>
          X
        </button>
        <div className={styles.container}>
          <Body links={links} />
          <Footer />
        </div>
      </div>
    </motion.div >
  )
}