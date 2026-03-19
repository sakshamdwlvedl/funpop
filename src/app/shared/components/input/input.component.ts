import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputConfig } from '../../../core/interfaces/dynamics.interface';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements OnInit, OnDestroy {
  control!: AbstractControl;
  isPasswordVisible = false;

  currentKeywordIndex = 0;
  currentKeyword = '';
  nextKeyword = '';
  isAnimating = false;
  intervalId: any;

  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input() config!: InputConfig;

  @Output() onchange = new EventEmitter<any>();
  @Output() onblur = new EventEmitter<any>();

  translateY = 0;

  ngOnInit(): void {
    this.control = this.form.get(this.controlName) as AbstractControl;

    if (this.config?.keywords?.length) {
      this.currentKeyword = this.config.keywords[0];

      this.intervalId = setInterval(() => {
        this.animateKeyword();
      }, 2000);
    }
  }

  animateKeyword() {
    if (!this.config?.keywords?.length) return;

    // Step 1: current goes DOWN
    this.translateY = 100;

    setTimeout(() => {
      this.currentKeywordIndex =
        (this.currentKeywordIndex + 1) % (this.config.keywords?.length ?? 1);

      this.currentKeyword =
        this.config.keywords?.[this.currentKeywordIndex] || '';

      // Step 2: place new word ABOVE (no animation)
      this.translateY = -100;

      requestAnimationFrame(() => {
        // Step 3: slide into center
        this.translateY = 0;
      });
    }, 400);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  startAnimation() {
    if (!this.config?.keywords?.length) return;

    this.isAnimating = true;

    const nextIndex =
      (this.currentKeywordIndex + 1) % this.config.keywords.length;

    this.nextKeyword = this.config.keywords[nextIndex];

    setTimeout(() => {
      this.currentKeyword = this.nextKeyword;
      this.currentKeywordIndex = nextIndex;
      this.isAnimating = false;
    }, 400);
  }

  blockInvalidNumberKeys(event: KeyboardEvent) {
    if (this.config?.type !== 'number') return;

    const blockedKeys = ['e', 'E', '+', '-'];
    if (blockedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onchange.emit({ config: this.config, value });
  }

  onBlur(event: Event) {
    this.onblur.emit(event);
  }
}
