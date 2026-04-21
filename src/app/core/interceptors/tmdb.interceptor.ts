import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const TOKEN_KEY = 'funpop_token';

export const tmdbInterceptor: HttpInterceptorFn = (req, next) => {
  const isTmdbRequest = req.url.startsWith('/tmdb');
  const isApiRequest = req.url.startsWith('/api');
  const token = localStorage.getItem(TOKEN_KEY);

  let updatedUrl = req.url;
  const headers: Record<string, string> = {};

  if (isTmdbRequest) {
    updatedUrl = req.url.replace('/tmdb', environment.TMDB_BASE_URL);
    return next(req.clone({
      url: updatedUrl,
      setParams: { api_key: environment.TMDB_API_KEY },
    }));
  } 
  
  if (isApiRequest) {
    updatedUrl = req.url.replace('/api', environment.BACKEND_URL + '/api');
  }

  // Common logic for attachment of JWT to backend requests (either /api started or full backend URL)
  if (isApiRequest || req.url.startsWith(environment.BACKEND_URL)) {
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  return next(req.clone({
    url: updatedUrl,
    setHeaders: headers,
  }));
};
