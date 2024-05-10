'use client'
import EditEntityComponent from './EditEntity';
import useDynamicFetchClient from '@/lib/useDynamicFetchClient';


export default function EditEntity({ params } : { params: { type: string, id: string },}) {
    const query = `${params.type}/${decodeURIComponent(params.id)}`;
    const { data, error, loading } = useDynamicFetchClient(query);

    return (
        <EditEntityComponent data={data} type={params.type} id={params.id} loading={loading}/>
    )
};
