import ChatPage from '@/components/ChatPage';
import { fetchWithAuth } from '@/hooks/fetchWithAuth';
import { redirect } from 'next/navigation';

export default async function Page() {
  try {
    const data = await fetchWithAuth('http://localhost:8000/api/users');
    return <ChatPage userData={data} />;
  } catch (error) {
    console.error('Error fetching data:', error.status, error.message);
    if (error.status === 401) {
      redirect('/user/login');
    }
    return <p>Failed to load data. Status: {error.message}</p>;
  }
}
