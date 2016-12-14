import { browserDynamicPlatform } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

browserDynamicPlatform().bootstrapModule(AppModule);
