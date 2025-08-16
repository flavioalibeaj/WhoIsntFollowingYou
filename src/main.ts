import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));

// TODO sikur te ket nje opsion qe ti te besh unfollow direkt personin pa qen nevoja qe useri ta bej vet
// DMTH ta bej sistemi per userin. do me duhet akses nga instagrami, duhet te shof a mund te behet si gje
