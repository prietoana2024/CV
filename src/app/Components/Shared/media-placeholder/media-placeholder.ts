import { Component, Input } from '@angular/core';

export type MediaPlaceholderKind = 'video' | 'image';

@Component({
  selector: 'app-media-placeholder',
  standalone: true,
  templateUrl: './media-placeholder.html',
  styleUrl: './media-placeholder.css',
})
export class MediaPlaceholder {
  @Input() kind: MediaPlaceholderKind = 'image';
  @Input() label = '';
  @Input() ratio = '16 / 9';

  get defaultLabel(): string {
    return this.kind === 'video' ? 'Video demo próximamente' : 'Imagen del proyecto';
  }
}
