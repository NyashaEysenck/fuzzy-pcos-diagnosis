import axios from 'axios';

// Create an axios instance with base URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  signup: (userData: { name: string; email: string; password: string }) => 
    api.post('/auth/signup', userData),
  
  login: (credentials: { email: string; password: string }) => 
    api.post('/auth/login', credentials),
  
  getCurrentUser: () => 
    api.get('/auth/me'),
};

// Symptoms API
export const symptomsAPI = {
  createSymptom: (symptomData: any) => 
    api.post('/symptoms', symptomData),
  
  getMySymptoms: () => 
    api.get('/symptoms'),
  
  getSymptomsByDateRange: (startDate: string, endDate: string) => 
    api.get(`/symptoms/date-range?startDate=${startDate}&endDate=${endDate}`),
  
  getSymptom: (id: string) => 
    api.get(`/symptoms/${id}`),
  
  updateSymptom: (id: string, symptomData: any) => 
    api.patch(`/symptoms/${id}`, symptomData),
  
  deleteSymptom: (id: string) => 
    api.delete(`/symptoms/${id}`),
    
  getCycleStatistics: () =>
    api.get('/symptoms/cycle-statistics'),
};

// Calendar API
export const calendarAPI = {
  createEvent: (eventData: any) => 
    api.post('/calendar', eventData),
  
  getMyEvents: () => 
    api.get('/calendar'),
  
  getEventsByDateRange: (startDate: string, endDate: string) => 
    api.get(`/calendar/date-range?startDate=${startDate}&endDate=${endDate}`),
  
  getEvent: (id: string) => 
    api.get(`/calendar/${id}`),
  
  updateEvent: (id: string, eventData: any) => 
    api.patch(`/calendar/${id}`, eventData),
  
  deleteEvent: (id: string) => 
    api.delete(`/calendar/${id}`),
};

// Assessment API
export const assessmentAPI = {
  createAssessment: (assessmentData: any) => 
    api.post('/assessments', assessmentData),
  
  getMyAssessments: () => 
    api.get('/assessments'),
  
  getLatestAssessment: () => 
    api.get('/assessments/latest'),
  
  getAssessmentsByDateRange: (startDate: string, endDate: string) => 
    api.get(`/assessments/date-range?startDate=${startDate}&endDate=${endDate}`),
  
  getAssessment: (id: string) => 
    api.get(`/assessments/${id}`),
};

export default api;
