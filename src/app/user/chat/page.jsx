import ChatPage from './ChatPage';
import { fetchWithAuth } from '@/hooks/fetchWithAuth';


export default async function Page() {

    try {
        const data = await fetchWithAuth('http://localhost:8000/api/users');
        return <ChatPage userData={data} />;
    } catch (error) {

        console.error('Error fetching data:', error.status, error.message);
        return <p>Failed to load data. Status: {error.response?.status}</p>;
    }
}
