/*import { Component } from '@angular/core';

@Component({
  selector: 'app-home-component',
  imports: [],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent {

}*/
/*
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThreeScene } from '../../three-scene/three-scene';

@Component({
  selector: 'app-home-component',
  imports: [ThreeScene],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent {
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
}*/
import { Component, Inject, PLATFORM_ID, OnInit, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ThreeScene } from '../../three-scene/three-scene';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule, ThreeScene],
  templateUrl: './home-component.html',
})
export class HomeComponent implements OnInit {
  isBrowser = false;
  showAnimation = true;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      setTimeout(() => {
        this.showAnimation = false;
        this.cdr.detectChanges();
      }, 6000);
    }
  }
}
