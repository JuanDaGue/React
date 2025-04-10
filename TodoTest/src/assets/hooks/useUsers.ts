import { User } from '../../../Types';

const API_URL = import.meta.env.VITE_APP_API_URL || 'https://jsonplaceholder.typicode.com/users';
// const API_URL = 'https://jsonplaceholder.typicode.com/users'; // Fallback URL if env variable is not set

export async function fetchUsers(): Promise<User[]> {

    const jwtToken = import.meta.env.VITE_APP_JWT_TOKEN;
  console.log("JWT", jwtToken);
  const response = await fetch(API_URL, {
    headers: {
      'Authorization': `Bearer ${jwtToken}`, 
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}