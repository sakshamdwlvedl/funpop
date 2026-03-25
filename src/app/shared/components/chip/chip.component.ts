import { CommonModule } from '@angular/common';
import { Component, Input, HostBinding } from '@angular/core';

export interface ChipStateStyle {
  borderColor?: string;
  bgColor?: string;
  textColor?: string;
}

export interface ChipConfig {
  padding?: string;
  borderRadius?: string;
  borderColor?: string;
  bgColor?: string;
  textColor?: string;
  fontSize?: string;
  fontWeight?: number | string;
  cursor?: string;
  hover?: ChipStateStyle;
  selected?: ChipStateStyle;
}

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
})
export class ChipComponent {
  @Input() label!: string;
  @Input() styles!: ChipConfig;
  @Input() selected = false;

  isHovered = false;

  get styling() {
    const base = {
      padding: this.styles?.padding || '4px 10px',
      borderRadius: this.styles?.borderRadius || '12px',
      borderColor: this.styles?.borderColor || '$gray-200',
      backgroundColor: this.styles?.bgColor || 'transparent',
      color: this.styles?.textColor || '$gray-600',
      fontSize: this.styles?.fontSize || '12px',
      fontWeight: this.styles?.fontWeight || 600,
      cursor: this.styles?.cursor || 'pointer',
    };

    if (this.selected && this.styles?.selected) {
      return {
        ...base,
        borderColor: this.styles.selected.borderColor ?? base.borderColor,
        backgroundColor: this.styles.selected.bgColor ?? base.backgroundColor,
        color: this.styles.selected.textColor ?? base.color,
      };
    }

    if (this.isHovered && this.styles?.hover) {
      return {
        ...base,
        borderColor: this.styles.hover.borderColor ?? base.borderColor,
        backgroundColor: this.styles.hover.bgColor ?? base.backgroundColor,
        color: this.styles.hover.textColor ?? base.color,
      };
    }

    return base;
  }

  onEnter() {
    this.isHovered = true;
  }

  onLeave() {
    this.isHovered = false;
  }
}
