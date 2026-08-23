import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-three-scene',
  standalone: true,
  template: `<div #threeContainer class="three-container"></div>`,
  styleUrl: './three-scene.css',
})
export class ThreeScene implements AfterViewInit, OnDestroy {
  @ViewChild('threeContainer', { static: false }) container!: ElementRef<HTMLDivElement>;

  private animationId: number | null = null;
  private resizeHandler = () => this.handleResize();
  private renderer?: THREE.WebGLRenderer;
  private camera?: THREE.OrthographicCamera;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnDestroy(): void {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.resizeHandler);
    this.renderer?.dispose();
    if (this.container?.nativeElement) this.container.nativeElement.innerHTML = '';
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const el = this.container.nativeElement;
    const width = el.clientWidth;
    const height = el.clientHeight;

    const rootStyles = getComputedStyle(document.documentElement);
    const bgColor = rootStyles.getPropertyValue('--bg').trim() || '#ffffff';
    const inkColor = rootStyles.getPropertyValue('--ink').trim() || '#0a0a0a';
    const accentColor = rootStyles.getPropertyValue('--accent').trim() || '#1f8a4c';

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(bgColor);

    const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
    camera.position.z = 500;
    this.camera = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    this.renderer = renderer;

    const createTextSprite = (text: string, size: number, color: string, weight = '700') => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = 512;
      canvas.height = 256;
      ctx.font = `${weight} ${size}px 'Space Grotesk', Arial`;
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 256, 128);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0 });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(canvas.width, canvas.height, 1);
      return sprite;
    };

    const nameLetters = 'ANA PRIETO'.split('').map((letter, i) => {
      const sprite = createTextSprite(letter === ' ' ? '' : letter, 70, inkColor);
      sprite.position.set(-320 + i * 68, 20, 0);
      scene.add(sprite);
      return sprite;
    });

    const apBig = createTextSprite('AP', 210, inkColor);
    apBig.position.set(0, 20, 0);
    scene.add(apBig);

    const roleText = createTextSprite('FULL STACK · IA · MEDELLÍN', 26, accentColor, '600');
    roleText.position.set(0, -160, 0);
    scene.add(roleText);

    const startTime = Date.now();
    const phase1 = 1100;
    const phase2 = 1300;
    const phase3 = 900;
    const total = phase1 + phase2 + phase3;

    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const settleFinalState = () => {
      apBig.material.opacity = 1;
      roleText.material.opacity = 1;
      nameLetters.forEach((letter) => (letter.material.opacity = 0));
      renderer.render(scene, camera);
    };

    const animate = () => {
      const elapsed = Date.now() - startTime;

      if (elapsed >= total) {
        settleFinalState();
        return;
      }

      this.animationId = requestAnimationFrame(animate);

      if (elapsed < phase1) {
        const progress = elapsed / phase1;
        nameLetters.forEach((letter, i) => {
          if (progress > i * 0.08) letter.material.opacity = 1;
        });
      } else if (elapsed < phase1 + phase2) {
        const progress = (elapsed - phase1) / phase2;
        const eased = easeInOutCubic(progress);
        nameLetters.forEach((letter) => {
          letter.material.opacity = 1 - eased;
        });
        apBig.material.opacity = eased;
      } else {
        const progress = (elapsed - phase1 - phase2) / phase3;
        apBig.material.opacity = 1;
        roleText.material.opacity = easeInOutCubic(progress);
      }

      renderer.render(scene, camera);
    };

    animate();
    window.addEventListener('resize', this.resizeHandler);
  }

  private handleResize(): void {
    if (!this.renderer || !this.camera || !this.container) return;
    const w = this.container.nativeElement.clientWidth;
    const h = this.container.nativeElement.clientHeight;
    this.camera.left = w / -2;
    this.camera.right = w / 2;
    this.camera.top = h / 2;
    this.camera.bottom = h / -2;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }
}
