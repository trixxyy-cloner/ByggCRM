const API_BASE_URL = 'https://byggcrm-app-wgu3p.ondigitalocean.app/api';

// Helper function to get user-friendly error messages
function getErrorMessage(status: number, errorText: string): string {
  // Try to parse JSON error response
  try {
    const errorData = JSON.parse(errorText);
    if (errorData.message) {
      return errorData.message;
    }
  } catch {
    // Not JSON, continue with status code mapping
  }

  // Map status codes to friendly messages
  switch (status) {
    case 400:
      return 'Fel e-post eller lösenord. Försök igen.';
    case 401:
      return 'Du är inte inloggad. Vänligen logga in igen.';
    case 403:
      return 'Du har inte åtkomst till denna resurs.';
    case 404:
      return 'Resursen hittades inte.';
    case 409:
      return 'E-postadressen är redan registrerad.';
    case 500:
      return 'Serverfel. Försök igen senare.';
    default:
      return `Ett fel uppstod (${status}). Försök igen.`;
  }
}

export const api = {
  async post<T>(endpoint: string, data: any, token?: string): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      const friendlyMessage = getErrorMessage(response.status, errorText);
      throw new Error(friendlyMessage);
    }

    return response.json();
  },

  async get<T>(endpoint: string, token?: string): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    console.log('GET request to:', `${API_BASE_URL}${endpoint}`);
    console.log('Token:', token ? 'Present' : 'Missing');

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      const friendlyMessage = getErrorMessage(response.status, errorText);
      throw new Error(friendlyMessage);
    }

    return response.json();
  },

  async put<T>(endpoint: string, data: any, token?: string): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      const friendlyMessage = getErrorMessage(response.status, errorText);
      throw new Error(friendlyMessage);
    }

    return response.json();
  },

  async delete<T>(endpoint: string, token?: string): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      const friendlyMessage = getErrorMessage(response.status, errorText);
      throw new Error(friendlyMessage);
    }

    return response.json();
  },
};