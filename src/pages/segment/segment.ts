import { Component } from '@angular/core';

import { Platform } from 'ionic-angular';


@Component({
    selector:"page-segment",
  templateUrl: 'segment.html'
})
export class SegmentPage {
  pet: string = "puppies";
  isAndroid: boolean = false;

  constructor(platform: Platform) {
    this.isAndroid = platform.is('android');
  }
}