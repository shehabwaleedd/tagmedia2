
import { serverDynamicFetch } from '@/lib/serverDynamicFetch';
import EditEntityComponent from './EditEntity';


export default async function EditEntity({ params } : { params: { type: string, id: string },}) {
    const query = `${params.type}/${decodeURIComponent(params.id)}`;

    const data = await serverDynamicFetch(query);

    console.log(query, "query", data, "data")

    return (
        <EditEntityComponent data={data} type={params.type} id={params.id}/>
    )
};
