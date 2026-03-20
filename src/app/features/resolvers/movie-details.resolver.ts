import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ApiCallService } from '../../core/services/api-call.service';

export const movieResolver: ResolveFn<any> = (route) => {
  const apiService = inject(ApiCallService);
  const id = route.paramMap.get('id') ?? '';
  const mediaType = route.paramMap.get('type');

  return apiService.getDetails(mediaType as 'movie' | 'tv', id.toString());
};
