import { User } from '../../../../Types';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(API_URL, {
    headers: {
      'Authorization': 'Bearer your_jwt_token_here', // Simulated JWT
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}