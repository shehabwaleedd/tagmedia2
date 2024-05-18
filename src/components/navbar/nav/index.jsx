import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { height } from '../anim';
import Body from './Body';


const links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "News",
    href: "/news",
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
      variants={height}
      className={styles.nav}>

      <div className={styles.wrapper}>
        <button className={styles.hamburger} onClick={() => setMenuOpened(false)}>
          X
        </button>
        <div className={styles.container}>
          <Body links={links} />
        </div>
      </div>
    </motion.div >
  )
}