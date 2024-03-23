import React from 'react'
import styles from './page.module.scss'
import Landing from "./components/landing"
const page = () => {
    return (
        <main className={styles.services}>
            <Landing />
        </main>
    )
}

export default page