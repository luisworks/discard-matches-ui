import { Component } from '@angular/core';
import { DiscardMatchesComponent } from './discard-matches/discard-matches.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DiscardMatchesComponent],
  template: '<app-discard-matches></app-discard-matches>'
  
})
export class AppComponent {}
