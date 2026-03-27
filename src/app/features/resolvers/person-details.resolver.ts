import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PersonDetail } from '../../features/interfaces/person-detail.interface';
import { ApiCallService } from '../../core/services/api-call.service';

export const personDetailResolver: ResolveFn<PersonDetail> = (route) => {
  const api = inject(ApiCallService);
  return api.getPersonDetails(route.paramMap.get('id')!);
};
