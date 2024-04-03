import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { TodosModule } from './todos/todos.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    TodosModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
