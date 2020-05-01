import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BACKEND_SERVICE } from './backend.service';
import { BackendHttpService } from './backend-http.service';
import { LoggerService } from './logger.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from './logging-interceptor';
import { RequestCache, RequestCacheWithMap } from './request-cache.service';
import { CachingInterceptor } from './caching-interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: BACKEND_SERVICE, useClass: BackendHttpService },
    { provide: RequestCache, useClass: RequestCacheWithMap },
    // { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
  ]
})
export class CoreModule { }
