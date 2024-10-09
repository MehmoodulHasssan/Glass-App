import ChatPage from '@/components/ChatPage';
import { fetchWithAuth } from '@/hooks/fetchWithAuth';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

export default async function Page() {
  const accessToken = cookies().get('accessToken')?.value;
  console.log(accessToken);
  try {
    const data = await fetchWithAuth('http://localhost:8000/api/users');
    return <ChatPage userData={data} accessToken={accessToken} />;
  } catch (error) {
    console.error('Error fetching data:', error.status, error.message);
    if (error.status === 401) {
      redirect('/user/login');
    }
    return <p>Failed to load data. Status: {error.message}</p>;
  }
}
