import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThreeScene } from './Components/three-scene/three-scene';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ThreeScene],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'CV';
}
