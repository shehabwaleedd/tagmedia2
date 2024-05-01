'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './style.module.scss';
import Image from 'next/image';
import Link from 'next/link';

interface EntityProps {
    type: string;
}

interface Entity {
    id: string;
    _id: string;
    name: string;
    description?: string;
    image: {
        url: string;
    };
    position?: string;

}

const DisplayEntities: React.FC<EntityProps> = ({ type }) => {
    const [entities, setEntities] = useState<Entity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${type}`);
                setEntities(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };
        fetchData();
    }, [type]);

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/${type}/${id}`);
            if (response.status === 200) {
                setEntities(prev => prev.filter(entity => entity._id !== id));
            } else {
                throw new Error("Failed to delete entity");
            }
        } catch (err) {
            setError('Failed to delete entity');
        }
    };


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.allEntities}>
            <h1>{type.charAt(0).toUpperCase() + type.slice(1)}</h1>
            <div className={styles.allEntities__container}>
                {entities.map(entity => (
                    <div key={entity.id} className={styles.allEntities__container__card}>
                        <div className={styles.allEntities__container__card_top}>
                            <Image src={entity.image.url || '/placeholder.png'} alt={entity.name} className={styles.image} width={500} height={500} />
                            <p>{entity.name}</p>
                        </div>
                        <div className={styles.allEntities__container__card_top}>
                            {type === 'team' && <p>{entity.position}</p>}
                        </div>
                        <div className={styles.allEntities__container__card_top} style={{ paddingRight: "1rem" }}>
                            <Link href={`/account/edit/${type}/${entity._id}`}>Edit</Link>
                            <button onClick={() => handleDelete(entity._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisplayEntities;
