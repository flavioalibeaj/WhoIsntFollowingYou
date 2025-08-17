import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StateData } from '../model/state-data.type';

export const stateDataGuard: CanActivateFn = () => {
  const router = inject(Router);

  const state = router.getCurrentNavigation()?.extras.state as
    | StateData[]
    | undefined;

  if (!state?.length) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};
