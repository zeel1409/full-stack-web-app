// import { supabase } from './supabase';

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// export async function getAuthToken() {
//   const { data: { session } } = await supabase.auth.getSession();
//   return session?.access_token;
// }

// export async function apiCall<T>(
//   method: string,
//   endpoint: string,
//   data?: unknown
// ): Promise<T> {
//   const token = await getAuthToken();

//   if (!token) {
//     throw new Error('No authentication token');
//   }

//   const url = `${API_BASE_URL}${endpoint}`;
//   const options: RequestInit = {
//     method,
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     }
//   };

//   if (data) {
//     options.body = JSON.stringify(data);
//   }

//   const response = await fetch(url, options);

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.error || `HTTP ${response.status}`);
//   }

//   if (response.status === 204) {
//     return undefined as T;
//   }

//   return response.json();
// }

// export const api = {
//   createTranscript: (text: string, language: string) =>
//     apiCall('POST', '/transcripts', { text, language }),

//   getTranscripts: () =>
//     apiCall('GET', '/transcripts'),

//   getTranscript: (id: string) =>
//     apiCall('GET', `/transcripts/${id}`),

//   updateTranscript: (id: string, text: string, language?: string) =>
//     apiCall('PATCH', `/transcripts/${id}`, { text, language }),

//   deleteTranscript: (id: string) =>
//     apiCall('DELETE', `/transcripts/${id}`)
// };


import { supabase } from './supabase';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'; 

export async function getAuthToken() {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token;
}

export async function apiCall<T>(
  method: string,
  endpoint: string,
  data?: unknown
): Promise<T> {
  const token = await getAuthToken();

  if (!token) {
    throw new Error('No authentication token — please login again.');
  }

  const url = `${API_BASE_URL}${endpoint}`; 
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}`;

    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch {
      // ignore JSON parse error
    }

    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export const api = {
  createTranscript: (text: string, language: string) =>
    apiCall('POST', '/transcripts', { text, language }),

  getTranscripts: () =>
    apiCall('GET', '/transcripts'),

  getTranscript: (id: string) =>
    apiCall('GET', `/transcripts/${id}`),

  updateTranscript: (id: string, text: string, language?: string) =>
    apiCall('PATCH', `/transcripts/${id}`, { text, language }),

  deleteTranscript: (id: string) =>
    apiCall('DELETE', `/transcripts/${id}`)
};
