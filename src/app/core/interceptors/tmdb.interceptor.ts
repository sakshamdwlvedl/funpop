import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const tmdbInterceptor: HttpInterceptorFn = (req, next) => {
  const isTmdbRequest = req.url.startsWith('/tmdb');

  let updatedReq;

  updatedReq = isTmdbRequest
    ? req.clone({
        url: req.url.replace('/tmdb', environment.TMDB_BASE_URL),
        setParams: {
          api_key: environment.TMDB_API_KEY,
        },
      })
    : req.clone({
        url: req.url.replace('/api', environment.BACKEND_URL),
      });

  return next(updatedReq);
};
