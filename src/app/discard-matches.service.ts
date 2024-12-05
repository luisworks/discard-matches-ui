import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiscardMatchesService {

  constructor() { }

  discardMatches(rise: string[], ip: string[]): { unmatchedRise: string[], unmatchedIp: string[] } {
    const unmatchedRise: string[] = [];
    const unmatchedIp: string[] = [];

    // Find unmatched values in RISE
    for (const value of rise) {
      if (!ip.includes(value)) {
        unmatchedRise.push(value);
      }
    }

    // Find unmatched values in IP
    for (const value of ip) {
      if (!rise.includes(value)) {
        unmatchedIp.push(value);
      }
    }

    return { unmatchedRise, unmatchedIp };
  }
}