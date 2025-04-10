import { User } from '../../../Types';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export async function fetchUsers(): Promise<User[]> {
    // const apiUrl = process.env.REACT_APP_API_URL;
    // console.log("API", apiUrl);
    const jwtToken = process.env.REACT_APP_JWT_TOKEN;
  
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