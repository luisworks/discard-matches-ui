import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiscardMatchesService } from '../discard-matches.service';

@Component({
  selector: 'app-discard-matches',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './discard-matches.component.html'
})
export class DiscardMatchesComponent {
  rise: string = '';
  ip: string = '';
  unmatchedRise: string = '';
  unmatchedIp: string = '';

  constructor(@Inject(DiscardMatchesService) private readonly discardMatchesService: DiscardMatchesService) {}

  onSubmit() {
    const riseArray = this.rise.split('\n').map(item => item.trim()).filter(item => item);
    const ipArray = this.ip.split('\n').map(item => item.trim()).filter(item => item);

    const result = this.discardMatchesService.discardMatches(riseArray, ipArray);
    this.unmatchedRise = result.unmatchedRise.map(item => `'${item}'`).join(", \r \n");
    this.unmatchedIp = result.unmatchedIp.map(item => `'${item}'`).join(", \r \n");
  }
  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }
}