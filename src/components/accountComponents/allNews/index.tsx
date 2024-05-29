'use client'
import React, { useState, useEffect } from 'react'
import { useAllNews } from '@/lib/useAllNews'
import styles from "../../dashboardNews/style.module.scss"
import DashboardNews from '@/components/dashboardNews'

const AllTours = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { news, loading, totalPages } = useAllNews(currentPage);

    useEffect(() => {
        console.log(totalPages, "totalPages")
    }, [totalPages])


    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };


    return (
        <section>
            <DashboardNews news={news ?? []} title="All News" loading={loading} />
            <div className={styles.pagination}>
                <button onClick={handlePreviousPage} disabled={currentPage <= 1}>Previous</button>
                <span>Page {currentPage}</span>
                <button onClick={handleNextPage} disabled={currentPage >= totalPages}>Next</button>
            </div>
        </section>
    )
}

export default AllTours