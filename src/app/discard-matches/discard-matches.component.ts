import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiscardMatchesService } from '../discard-matches.service';
import * as XLSX from 'xlsx';

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
    this.unmatchedRise = result.unmatchedRise.map(item => `'${item}'`).join(', \n');
    this.unmatchedIp = result.unmatchedIp.map(item => `'${item}'`).join(', \n');
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }

  exportToExcel() {
    const riseArray = this.unmatchedRise.split(', ').map(item => item.replace(/'/g, ''));
    const ipArray = this.unmatchedIp.split(', ').map(item => item.replace(/'/g, ''));
  
    // Create an array of objects with RISE and IP properties
    const data = riseArray.map((rise, index) => ({
      RISE: rise,
      IP: ipArray[index] || ''
    }));
  
    // Create a worksheet with the data
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  
    // Add headers manually to ensure they are in the correct columns
    XLSX.utils.sheet_add_aoa(ws, [['RISE', 'IP']], { origin: 'A1' });
  
    // Create a new workbook and append the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Unmatched Values');
  
    // Write the workbook to a file
    XLSX.writeFile(wb, 'UnmatchedValues.xlsx');
  }
}