import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StateData } from '../model/state-data.type';

export const stateDataGuard: CanActivateFn = () => {
  const router = inject(Router);

  const result: StateData[] | undefined =
    router.getCurrentNavigation()?.extras.state?.['result'];

  if (!result?.length) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};
