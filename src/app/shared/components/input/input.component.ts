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

  slideDown = false;
  currentKeywordIndex = 0;
  intervalId: any;

  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input() config!: InputConfig;

  @Output() onchange = new EventEmitter<any>();
  @Output() onblur = new EventEmitter<any>();
  @Output() onClear = new EventEmitter<any>();

  ngOnInit(): void {
    this.control = this.form.get(this.controlName) as AbstractControl;

    if (this.config?.keywords?.length) {
      this.intervalId = setInterval(() => {
        this.animatePlaceholder();
      }, 3000);
    }
  }

  animatePlaceholder() {
    this.slideDown = true;

    setTimeout(() => {
      this.currentKeywordIndex =
        (this.currentKeywordIndex + 1) % (this.config.keywords?.length || 1);

      this.slideDown = false;
    }, 400);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
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

  clearInput() {
    this.control.reset();
    this.onClear.emit();
  }
}
