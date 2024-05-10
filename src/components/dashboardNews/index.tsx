import React, { useState, useEffect } from 'react'
import styles from "./style.module.scss"
import Image from 'next/image'
import { useRouter } from "next/navigation"
import Loading from '@/animation/loading/Loading'
import axios from 'axios'
import { DragDropContext, Droppable, Draggable, DroppableProvided, DraggableProvided, DropResult } from 'react-beautiful-dnd';
import Cookies from 'js-cookie'
import { NewsType } from '@/types/common'
import useWindowWidth from '@/hooks/useWindowWidth';

const DashboardNews = ({ news, loading, title }: { news: NewsType[]; loading: boolean; title: string; }) => {
    const router = useRouter();
    const [currentNews, setNews] = useState(news || []);
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth !== null && windowWidth < 768;

    useEffect(() => {
        setNews(news || []);
    }, [news]);


    const handleEditClick = (slug: string) => {
        router.push(`/account/edit/news/${slug}`);
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const items = Array.from(currentNews);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setNews(items); // Update the news array with new order
    };

    const saveOrder = async () => {
        const orderedNews = currentNews.map((item, index) => ({ _id: item._id, index: index + 1 }));
        try {
            await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog/order`, orderedNews, {
                headers: {
                    'Content-Type': 'application/json',
                    token: Cookies.get("token"),
                },
            });
            alert('Order saved successfully!');
        } catch (error) {
            console.error('Error saving order:', error);
            alert('Failed to save order.');
        }
    };

    const handleDeleteClick = async (eventId: string) => {
        const isConfirm = confirm("Are you sure you want to delete this event?");
        if (isConfirm) {
            try {
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${eventId}`, {
                    headers: {
                        token: Cookies.get("token"),
                    },
                });

                if (response.status === 200) {
                    alert("Event deleted successfully.");
                }
            } catch (error) {
                console.error("Error deleting event:", error);
                alert("There was a problem deleting the event, please try again later.");
            }
        }
    };



    if (loading) {
        return <Loading height={100} />
    }




    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <section className={styles.userTours}>
                <div className={styles.upper}>
                    {title && <h1>{title}</h1>}
                    <button onClick={saveOrder} style={{ marginTop: '20px' }}>Save Order</button>

                </div>
                <Droppable droppableId="news">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className={styles.userTours__container}>
                            {currentNews.map((event, index) => (
                                <Draggable key={event._id} draggableId={event._id} index={index}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={styles.userTours__container_card}>
                                            <div className={styles.userTours__container_card_top}>
                                                <Image src={event.mainImg ? event.mainImg.url : "/noimage.png"} alt={event.title} width={500} height={500} quality={100} />
                                                {isMobile ? (
                                                    <h3 className={styles.title}>
                                                        {event.title.slice(0, 10)}...
                                                    </h3>
                                                ) : (
                                                    <h3 className={styles.title}>
                                                        {event.title}
                                                    </h3>
                                                )}
                                            </div>
                                            <div className={styles.btns}>
                                                <button onClick={() => handleEditClick(event.slug)} style={{ backgroundColor: "#2e2e2e", color: "var(--container-color)" }}>
                                                    <span >
                                                        Edit
                                                    </span>
                                                </button>
                                                <button onClick={() => handleDeleteClick(event._id)} style={{ backgroundColor: "#ef6363" }}>
                                                    <span >
                                                        Delete
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

            </section>
        </DragDropContext>
    )
}

export default DashboardNews