'use client'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import styles from './page.module.scss'
import Loading from '@/animation/loading/Loading'
import AllTours from '@/components/accountComponents/allNews'
import DisplayEntities from './components/displayEntity'
import { AnimatePresence, motion } from 'framer-motion'
import AdminView from "@/components/accountViews/admin"
import CreateNews from './components/createNews/page'
import CreateCommon from './components/createCommon'


const Account = () => {
    const { handleLogout, isLoggedIn } = useAuth();
    const [activeSection, setActiveSection] = useState<string>('');
    const router = useRouter();


    const handleOpen = (sectionName: string) => () => {
        setActiveSection(sectionName);
    };




    return (
        <main className={styles.account}>
            <div className={styles.account__upper}>
                <h1>Account</h1>
                <button onClick={handleLogout}>
                    <span>
                        Logout
                    </span>
                </button>
            </div>
            <div className={styles.account__lower}>
                <div className={styles.account__lower_left}>
                    <div className={styles.account__lower_left_upper}>
                        <div className={styles.account_lower_left_upper_bottom}>
                            <h2>Tag Media Admin</h2>
                        </div>
                    </div>
                    <div className={styles.account__lower_left_lower}>
                        <AdminView handleOpen={handleOpen} />
                    </div>
                </div>

                <div className={styles.account__lower_right}>
                    <AnimatePresence mode='wait'>
                        {activeSection === 'createNews' && <CreateNews />}
                        {activeSection === 'createPartner' && <CreateCommon type='partner' />}
                        {activeSection === 'createWorkedWith' && <CreateCommon type='workedWith' />}
                        {activeSection === 'createTeam' && <CreateCommon type='team' />}
                        {activeSection === 'createPortfolio' && <CreateCommon type='portfolio' />}
                        {activeSection === 'createService' && <CreateCommon type='service' />}
                        {activeSection === 'partners' && <DisplayEntities type='partner' />}
                        {activeSection === 'workedWith' && <DisplayEntities type='workedWith' />}
                        {activeSection === 'team' && <DisplayEntities type='team' />}
                        {activeSection === 'portfolio' && <DisplayEntities type='portfolio' />}
                        {activeSection === 'services' && <DisplayEntities type='service' />}
                        {activeSection === 'news' && <AllTours />}
                        {activeSection === '' && <div className={styles.account__lower_right_default} style={{ padding: "1rem" }}><h2>Select a section to view</h2></div>}
                    </AnimatePresence>
                </div>

            </div>
        </main>
    )
}

export default Account