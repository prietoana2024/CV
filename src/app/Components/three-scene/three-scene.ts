/*import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-three-scene',
  imports: [],
  template: `<div #threeContainer style="width:100%;height:100vh;"></div>`,
  styleUrl: './three-scene.css'
})
export class ThreeScene implements AfterViewInit {
 @ViewChild('threeContainer', { static: false }) container!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return; // Evita ejecutar en SSR
    }

    const width = this.container.nativeElement.clientWidth;
    const height = this.container.nativeElement.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    this.container.nativeElement.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }
}*/

/*
import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-three-scene',
  standalone: true,
  template: `<div #threeContainer style="width:100%;height:100vh;background:#ffffff;"></div>`,
  styleUrl: './three-scene.css'
})
export class ThreeScene implements AfterViewInit, OnDestroy {
  @ViewChild('threeContainer', { static: false }) container!: ElementRef;
  private animationId: number | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const width = this.container.nativeElement.clientWidth;
    const height = this.container.nativeElement.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    
    const camera = new THREE.OrthographicCamera(
      width / -2, width / 2, height / 2, height / -2, 1, 1000
    );
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    this.container.nativeElement.appendChild(renderer.domElement);

    // Crear sprites de texto usando canvas
    const createTextSprite = (text: string, size: number, color: string) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d')!;
      canvas.width = 512;
      canvas.height = 256;
      
      context.font = `${size}px Arial`;
      context.fillStyle = color;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, 256, 128);
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(canvas.width, canvas.height, 1);
      
      return sprite;
    };

    // Crear las letras iniciales
    const astridLetters = 'ANA'.split('').map((letter, i) => {
      const sprite = createTextSprite(letter, 80, '#2c3e50');
      sprite.position.set(-300 + i * 100, 100, 0);
      scene.add(sprite);
      return sprite;
    });

    const prietoLetters = 'PRIETO'.split('').map((letter, i) => {
      const sprite = createTextSprite(letter, 80, '#2c3e50');
      sprite.position.set(-250 + i * 100, 0, 0);
      scene.add(sprite);
      return sprite;
    });

    // Crear las letras grandes AP
    const aBig = createTextSprite('A', 200, '#2c3e50');
    aBig.position.set(-150, 0, 0);
    aBig.material.opacity = 0;
    scene.add(aBig);

    const pBig = createTextSprite('P', 200, '#2c3e50');
    pBig.position.set(150, 0, 0);
    pBig.material.opacity = 0;
    scene.add(pBig);

    // Crear texto ARQUITECTA
    const arquitecta = createTextSprite('DESARROLLADOR DE SOFTWARE', 30, '#2c3e50');
    arquitecta.position.set(0, -200, 0);
    arquitecta.material.opacity = 0;
    scene.add(arquitecta);

    // Variables de animación
    const startTime = Date.now();
    const phase1Duration = 1500; // Mostrar nombres
    const phase2Duration = 1500; // Transición a AP
    const phase3Duration = 1000; // Mostrar ARQUITECTA
    const totalDuration = phase1Duration + phase2Duration + phase3Duration;

    const animate = () => {
      const elapsed = Date.now() - startTime;

      // Detener la animación después de completar
      if (elapsed >= totalDuration) {
        // Asegurar que todo esté en su estado final
        aBig.material.opacity = 1;
        pBig.material.opacity = 1;
        arquitecta.material.opacity = 1;
        astridLetters.forEach(letter => letter.material.opacity = 0);
        prietoLetters.forEach(letter => letter.material.opacity = 0);
        renderer.render(scene, camera);
        return;
      }

      this.animationId = requestAnimationFrame(animate);

      // Fase 1: Mostrar nombres completos
      if (elapsed < phase1Duration) {
        const progress = elapsed / phase1Duration;
        astridLetters.forEach((letter, i) => {
          if (progress > i * 0.1) {
            letter.material.opacity = 1;
          }
        });
        prietoLetters.forEach((letter, i) => {
          if (progress > 0.6 + i * 0.1) {
            letter.material.opacity = 1;
          }
        });
      }
      // Fase 2: Transición a AP
      else if (elapsed < phase1Duration + phase2Duration) {
        const progress = (elapsed - phase1Duration) / phase2Duration;
        const easeProgress = this.easeInOutCubic(progress);

        // Desvanecer letras que no sean A y P
        astridLetters.forEach((letter, i) => {
          if (i !== 0) { // No es la A
            letter.material.opacity = 1 - easeProgress;
            letter.position.y = 100 - easeProgress * 100;
          } else {
            // La A se mueve a su posición final
            letter.position.x = -300 + easeProgress * 150;
            letter.position.y = 100;
            letter.material.opacity = 1 - easeProgress;
          }
        });

        prietoLetters.forEach((letter, i) => {
          if (i !== 0) { // No es la P
            letter.material.opacity = 1 - easeProgress;
            letter.position.y = 0 - easeProgress * 100;
          } else {
            // La P se mueve a su posición final
            letter.position.x = -250 + easeProgress * 400;
            letter.position.y = 0;
            letter.material.opacity = 1 - easeProgress;
          }
        });

        // Aparecer las letras grandes AP
        aBig.material.opacity = easeProgress;
        pBig.material.opacity = easeProgress;
      }
      // Fase 3: Mostrar ARQUITECTA
      else {
        const progress = (elapsed - phase1Duration - phase2Duration) / phase3Duration;
        const easeProgress = this.easeInOutCubic(progress);

        // Mantener AP visible
        aBig.material.opacity = 1;
        pBig.material.opacity = 1;

        // Ocultar todas las letras pequeñas
        astridLetters.forEach(letter => letter.material.opacity = 0);
        prietoLetters.forEach(letter => letter.material.opacity = 0);

        // Mostrar ARQUITECTA
        arquitecta.material.opacity = easeProgress;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Manejar redimensionamiento
    window.addEventListener('resize', () => {
      const w = this.container.nativeElement.clientWidth;
      const h = this.container.nativeElement.clientHeight;
      camera.left = w / -2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = h / -2;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  }

  easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
}*/

/*import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-three-scene',
  standalone: true,
  template: `<div #threeContainer style="width:100%;height:100vh;background:#ffffff;"></div>`,
  styleUrl: './three-scene.css'
})
export class ThreeScene implements AfterViewInit, OnDestroy {
  @ViewChild('threeContainer', { static: false }) container!: ElementRef;
  private animationId: number | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const width = this.container.nativeElement.clientWidth;
    const height = this.container.nativeElement.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    
    const camera = new THREE.OrthographicCamera(
      width / -2, width / 2, height / 2, height / -2, 1, 1000
    );
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    this.container.nativeElement.appendChild(renderer.domElement);

    // Crear sprites de texto usando canvas
    const createTextSprite = (text: string, size: number, color: string) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d')!;
      canvas.width = 512;
      canvas.height = 256;
      
      // Usando Montserrat como fuente principal
      context.font = `bold ${size}px Montserrat, Arial`;
      context.fillStyle = color;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, 256, 128);
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(canvas.width, canvas.height, 1);
      
      return sprite;
    };

    // Crear las letras iniciales
    const astridLetters = 'ANA'.split('').map((letter, i) => {
      const sprite = createTextSprite(letter, 80, '#2c3e50');
      sprite.position.set(-300 + i * 100, 100, 0);
      scene.add(sprite);
      return sprite;
    });

    const prietoLetters = 'PRIETO'.split('').map((letter, i) => {
      const sprite = createTextSprite(letter, 80, '#2c3e50');
      sprite.position.set(-250 + i * 100, 0, 0);
      scene.add(sprite);
      return sprite;
    });

    // Crear las letras grandes AP
    const aBig = createTextSprite('A', 300, '#2c3e50');
    aBig.position.set(-150, 0, 0);
    aBig.material.opacity = 0;
    scene.add(aBig);

    const pBig = createTextSprite('P', 300, '#2c3e50');
    pBig.position.set(150, 0, 0);
    pBig.material.opacity = 0;
    scene.add(pBig);

    // Crear texto DESARROLLADOR DE SOFTWARE
    const arquitecta = createTextSprite('DESARROLLADOR DE SOFTWARE', 28, '#2c3e50');
    arquitecta.position.set(0, -200, 0);
    arquitecta.material.opacity = 0;
    scene.add(arquitecta);

    // Variables de animación
    const startTime = Date.now();
    const phase1Duration = 1500; // Mostrar nombres
    const phase2Duration = 1500; // Transición a AP
    const phase3Duration = 1000; // Mostrar DESARROLLADOR DE SOFTWARE
    const totalDuration = phase1Duration + phase2Duration + phase3Duration;

    const animate = () => {
      const elapsed = Date.now() - startTime;

      // Detener la animación después de completar
      if (elapsed >= totalDuration) {
        // Asegurar que todo esté en su estado final
        aBig.material.opacity = 1;
        pBig.material.opacity = 1;
        arquitecta.material.opacity = 1;
        astridLetters.forEach(letter => letter.material.opacity = 0);
        prietoLetters.forEach(letter => letter.material.opacity = 0);
        renderer.render(scene, camera);
        return;
      }

      this.animationId = requestAnimationFrame(animate);

      // Fase 1: Mostrar nombres completos
      if (elapsed < phase1Duration) {
        const progress = elapsed / phase1Duration;
        astridLetters.forEach((letter, i) => {
          if (progress > i * 0.1) {
            letter.material.opacity = 1;
          }
        });
        prietoLetters.forEach((letter, i) => {
          if (progress > 0.6 + i * 0.1) {
            letter.material.opacity = 1;
          }
        });
      }
      // Fase 2: Transición a AP
      else if (elapsed < phase1Duration + phase2Duration) {
        const progress = (elapsed - phase1Duration) / phase2Duration;
        const easeProgress = this.easeInOutCubic(progress);

        // Desvanecer letras que no sean A y P
        astridLetters.forEach((letter, i) => {
          if (i !== 0) { // No es la A
            letter.material.opacity = 1 - easeProgress;
            letter.position.y = 100 - easeProgress * 100;
          } else {
            // La A se mueve a su posición final
            letter.position.x = -300 + easeProgress * 150;
            letter.position.y = 100;
            letter.material.opacity = 1 - easeProgress;
          }
        });

        prietoLetters.forEach((letter, i) => {
          if (i !== 0) { // No es la P
            letter.material.opacity = 1 - easeProgress;
            letter.position.y = 0 - easeProgress * 100;
          } else {
            // La P se mueve a su posición final
            letter.position.x = -250 + easeProgress * 400;
            letter.position.y = 0;
            letter.material.opacity = 1 - easeProgress;
          }
        });

        // Aparecer las letras grandes AP
        aBig.material.opacity = easeProgress;
        pBig.material.opacity = easeProgress;
      }
      // Fase 3: Mostrar DESARROLLADOR DE SOFTWARE
      else {
        const progress = (elapsed - phase1Duration - phase2Duration) / phase3Duration;
        const easeProgress = this.easeInOutCubic(progress);

        // Mantener AP visible
        aBig.material.opacity = 1;
        pBig.material.opacity = 1;

        // Ocultar todas las letras pequeñas
        astridLetters.forEach(letter => letter.material.opacity = 0);
        prietoLetters.forEach(letter => letter.material.opacity = 0);

        // Mostrar DESARROLLADOR DE SOFTWARE
        arquitecta.material.opacity = easeProgress;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Manejar redimensionamiento
    window.addEventListener('resize', () => {
      const w = this.container.nativeElement.clientWidth;
      const h = this.container.nativeElement.clientHeight;
      camera.left = w / -2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = h / -2;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  }

  easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
}*/
/*import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-three-scene',
  imports: [],
  template: `<div #threeContainer style="width:100%;height:100vh;background:#ffffff;"></div>`,
  styleUrl: './three-scene.css'
})
export class ThreeScene implements AfterViewInit, OnDestroy {
  @ViewChild('threeContainer', { static: false }) container!: ElementRef;
  private animationId: number | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const width = this.container.nativeElement.clientWidth;
    const height = this.container.nativeElement.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    
    const camera = new THREE.OrthographicCamera(
      width / -2, width / 2, height / 2, height / -2, 1, 1000
    );
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    this.container.nativeElement.appendChild(renderer.domElement);

    // Crear sprites de texto usando canvas
    const createTextSprite = (text: string, size: number, color: string) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d')!;
      canvas.width = 512;
      canvas.height = 256;
      
      // Usando Montserrat como fuente principal
      context.font = `600 ${size}px Montserrat, Arial`;
      context.fillStyle = color;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, 256, 128);
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(canvas.width, canvas.height, 1);
      
      return sprite;
    };

    // Crear las letras iniciales
    const astridLetters = 'ANA'.split('').map((letter, i) => {
      const sprite = createTextSprite(letter, 80, '#2c3e50');
      sprite.position.set(-300 + i * 100, 100, 0);
      scene.add(sprite);
      return sprite;
    });

    const prietoLetters = 'PRIETO'.split('').map((letter, i) => {
      const sprite = createTextSprite(letter, 80, '#2c3e50');
      sprite.position.set(-250 + i * 100, 0, 0);
      scene.add(sprite);
      return sprite;
    });

    // Crear las letras grandes AP
    const aBig = createTextSprite('A', 200, '#2c3e50');
    aBig.position.set(-150, 0, 0);
    aBig.material.opacity = 0;
    scene.add(aBig);

    const pBig = createTextSprite('P', 200, '#2c3e50');
    pBig.position.set(150, 0, 0);
    pBig.material.opacity = 0;
    scene.add(pBig);

    // Crear texto DESARROLLADOR DE SOFTWARE
    const arquitecta = createTextSprite('DESARROLLADOR DE SOFTWARE', 30, '#2c3e50');
    arquitecta.position.set(0, -200, 0);
    arquitecta.material.opacity = 0;
    scene.add(arquitecta);

    // Variables de animación
    const startTime = Date.now();
    const phase1Duration = 1500; // Mostrar nombres
    const phase2Duration = 1500; // Transición a AP
    const phase3Duration = 1000; // Mostrar DESARROLLADOR DE SOFTWARE
    const totalDuration = phase1Duration + phase2Duration + phase3Duration;

    const animate = () => {
      const elapsed = Date.now() - startTime;

      // Detener la animación después de completar
      if (elapsed >= totalDuration) {
        // Asegurar que todo esté en su estado final
        aBig.material.opacity = 1;
        pBig.material.opacity = 1;
        arquitecta.material.opacity = 1;
        astridLetters.forEach(letter => letter.material.opacity = 0);
        prietoLetters.forEach(letter => letter.material.opacity = 0);
        renderer.render(scene, camera);
        return;
      }

      this.animationId = requestAnimationFrame(animate);

      // Fase 1: Mostrar nombres completos
      if (elapsed < phase1Duration) {
        const progress = elapsed / phase1Duration;
        astridLetters.forEach((letter, i) => {
          if (progress > i * 0.1) {
            letter.material.opacity = 1;
          }
        });
        prietoLetters.forEach((letter, i) => {
          if (progress > 0.6 + i * 0.1) {
            letter.material.opacity = 1;
          }
        });
      }
      // Fase 2: Transición a AP
      else if (elapsed < phase1Duration + phase2Duration) {
        const progress = (elapsed - phase1Duration) / phase2Duration;
        const easeProgress = this.easeInOutCubic(progress);

        // Desvanecer letras que no sean A y P
        astridLetters.forEach((letter, i) => {
          if (i !== 0) { // No es la A
            letter.material.opacity = 1 - easeProgress;
            letter.position.y = 100 - easeProgress * 100;
          } else {
            // La A se mueve a su posición final
            letter.position.x = -300 + easeProgress * 150;
            letter.position.y = 100;
            letter.material.opacity = 1 - easeProgress;
          }
        });

        prietoLetters.forEach((letter, i) => {
          if (i !== 0) { // No es la P
            letter.material.opacity = 1 - easeProgress;
            letter.position.y = 0 - easeProgress * 100;
          } else {
            // La P se mueve a su posición final
            letter.position.x = -250 + easeProgress * 400;
            letter.position.y = 0;
            letter.material.opacity = 1 - easeProgress;
          }
        });

        // Aparecer las letras grandes AP
        aBig.material.opacity = easeProgress;
        pBig.material.opacity = easeProgress;
      }
      // Fase 3: Mostrar DESARROLLADOR DE SOFTWARE
      else {
        const progress = (elapsed - phase1Duration - phase2Duration) / phase3Duration;
        const easeProgress = this.easeInOutCubic(progress);

        // Mantener AP visible
        aBig.material.opacity = 1;
        pBig.material.opacity = 1;

        // Ocultar todas las letras pequeñas
        astridLetters.forEach(letter => letter.material.opacity = 0);
        prietoLetters.forEach(letter => letter.material.opacity = 0);

        // Mostrar DESARROLLADOR DE SOFTWARE
        arquitecta.material.opacity = easeProgress;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Manejar redimensionamiento
    window.addEventListener('resize', () => {
      const w = this.container.nativeElement.clientWidth;
      const h = this.container.nativeElement.clientHeight;
      camera.left = w / -2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = h / -2;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  }

  easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
}*/
import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-three-scene',
  standalone: true,
  template: `<div #threeContainer style="width:100%;height:100vh;background:#ffffff;"></div>`,
  styleUrls: ['./three-scene.css']
})
export class ThreeScene implements AfterViewInit, OnDestroy {
  @ViewChild('threeContainer', { static: false }) container!: ElementRef;
  private animationId: number | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnDestroy(): void {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    // ✅ Limpia completamente el contenido del contenedor
    if (this.container?.nativeElement) {
      this.container.nativeElement.innerHTML = '';
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const width = this.container.nativeElement.clientWidth;
    const height = this.container.nativeElement.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    
    const camera = new THREE.OrthographicCamera(
      width / -2, width / 2, height / 2, height / -2, 1, 1000
    );
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    this.container.nativeElement.appendChild(renderer.domElement);

    // Crear sprites de texto usando canvas
    const createTextSprite = (text: string, size: number, color: string) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d')!;
      canvas.width = 512;
      canvas.height = 256;
      
      // Usando Montserrat como fuente principal
      context.font = `600 ${size}px Montserrat, Arial`;
      context.fillStyle = color;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, 256, 128);
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(canvas.width, canvas.height, 1);
      
      return sprite;
    };

    // Crear las letras iniciales
    const astridLetters = 'ANA'.split('').map((letter, i) => {
      const sprite = createTextSprite(letter, 80, '#2c3e50');
      sprite.position.set(-300 + i * 100, 100, 0);
      scene.add(sprite);
      return sprite;
    });

    const prietoLetters = 'PRIETO'.split('').map((letter, i) => {
      const sprite = createTextSprite(letter, 80, '#2c3e50');
      sprite.position.set(-250 + i * 100, 0, 0);
      scene.add(sprite);
      return sprite;
    });

    // Crear las letras grandes AP
    const aBig = createTextSprite('A', 200, '#2c3e50');
    aBig.position.set(-150, 0, 0);
    aBig.material.opacity = 0;
    scene.add(aBig);

    const pBig = createTextSprite('P', 200, '#2c3e50');
    pBig.position.set(150, 0, 0);
    pBig.material.opacity = 0;
    scene.add(pBig);

    // Crear texto DESARROLLADOR DE SOFTWARE
    const arquitecta = createTextSprite('DESARROLLADOR DE SOFTWARE', 30, '#2c3e50');
    arquitecta.position.set(0, -200, 0);
    arquitecta.material.opacity = 0;
    scene.add(arquitecta);

    // Variables de animación
    const startTime = Date.now();
    const phase1Duration = 1500; // Mostrar nombres
    const phase2Duration = 1500; // Transición a AP
    const phase3Duration = 1000; // Mostrar DESARROLLADOR DE SOFTWARE
    const totalDuration = phase1Duration + phase2Duration + phase3Duration;

    const animate = () => {
      const elapsed = Date.now() - startTime;

      // Detener la animación después de completar
      if (elapsed >= totalDuration) {
        // Asegurar que todo esté en su estado final
        aBig.material.opacity = 1;
        pBig.material.opacity = 1;
        arquitecta.material.opacity = 1;
        astridLetters.forEach(letter => letter.material.opacity = 0);
        prietoLetters.forEach(letter => letter.material.opacity = 0);
        renderer.render(scene, camera);
        return;
      }

      this.animationId = requestAnimationFrame(animate);

      // Fase 1: Mostrar nombres completos
      if (elapsed < phase1Duration) {
        const progress = elapsed / phase1Duration;
        astridLetters.forEach((letter, i) => {
          if (progress > i * 0.1) {
            letter.material.opacity = 1;
          }
        });
        prietoLetters.forEach((letter, i) => {
          if (progress > 0.6 + i * 0.1) {
            letter.material.opacity = 1;
          }
        });
      }
      // Fase 2: Transición a AP
      else if (elapsed < phase1Duration + phase2Duration) {
        const progress = (elapsed - phase1Duration) / phase2Duration;
        const easeProgress = this.easeInOutCubic(progress);

        // Desvanecer letras que no sean A y P
        astridLetters.forEach((letter, i) => {
          if (i !== 0) { // No es la A
            letter.material.opacity = 1 - easeProgress;
            letter.position.y = 100 - easeProgress * 100;
          } else {
            // La A se mueve a su posición final
            letter.position.x = -300 + easeProgress * 150;
            letter.position.y = 100;
            letter.material.opacity = 1 - easeProgress;
          }
        });

        prietoLetters.forEach((letter, i) => {
          if (i !== 0) { // No es la P
            letter.material.opacity = 1 - easeProgress;
            letter.position.y = 0 - easeProgress * 100;
          } else {
            // La P se mueve a su posición final
            letter.position.x = -250 + easeProgress * 400;
            letter.position.y = 0;
            letter.material.opacity = 1 - easeProgress;
          }
        });

        // Aparecer las letras grandes AP
        aBig.material.opacity = easeProgress;
        pBig.material.opacity = easeProgress;
      }
      // Fase 3: Mostrar DESARROLLADOR DE SOFTWARE
      else {
        const progress = (elapsed - phase1Duration - phase2Duration) / phase3Duration;
        const easeProgress = this.easeInOutCubic(progress);

        // Mantener AP visible
        aBig.material.opacity = 1;
        pBig.material.opacity = 1;

        // Ocultar todas las letras pequeñas
        astridLetters.forEach(letter => letter.material.opacity = 0);
        prietoLetters.forEach(letter => letter.material.opacity = 0);

        // Mostrar DESARROLLADOR DE SOFTWARE
        arquitecta.material.opacity = easeProgress;
      }

      renderer.render(scene, camera);
    };

    
    animate();

    window.addEventListener('resize', () => {
      const w = this.container.nativeElement.clientWidth;
      const h = this.container.nativeElement.clientHeight;
      camera.left = w / -2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = h / -2;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  }

  easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
}