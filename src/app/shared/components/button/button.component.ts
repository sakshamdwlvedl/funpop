import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ButtonConfig } from '../../../core/interfaces/dynamics.interface';
import { CommonService } from '../../../core/services/common.service';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() styles!: ButtonConfig;
  @Input() loading = false;
  @Input() disabled = false;

  @Output() onClick = new EventEmitter<void>();

  isHovered = false;

  constructor(private readonly commonService: CommonService) {}

  get styling() {
    const base = {
      // styling that should be applied on outer part of the btn
      transition: 'all 0.15s ease',
      padding: !this.commonService.isMobile
        ? this.styles?.padding || '6px 14px'
        : this.styles?.breakSM?.padding || '2px 8px',
      borderRadius: this.styles?.borderRadius || '6px',
      ...(this.styles?.borderColor
        ? {
            border: `1px solid ${this.styles?.borderColor}`,
            borderColor: this.styles?.borderColor,
          }
        : {}),
      backgroundColor: this.styles?.bgColor || 'transparent',
      color: this.styles?.textColor || '#4b5563',
      cursor: this.styles?.cursor || 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',

      // for inner part of the btn
      '--btn-font-size': !this.commonService.isMobile
        ? this.styles?.fontSize || '14px'
        : this.styles?.breakSM?.fontSize || '12px',
      '--btn-font-weight': this.styles?.fontWeight || 400,
      '--btn-flex-direction':
        this.styles?.iconPosition === 'right' ? 'row-reverse' : 'row',
    };

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

  onBtnClick() {
    if (!this.disabled && !this.loading) {
      this.onClick.emit();
    }
  }
}
