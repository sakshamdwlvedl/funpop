interface ControlsCommonConfig {
  isVisible?: boolean;
  leaveSpaceForErrors?: boolean;
}

export interface InputConfig extends ControlsCommonConfig {
  placeholder?: string;
  staticPlaceholder?: string;
  keywords?: string[];
  type?: 'text' | 'number' | 'email' | 'password';
  icon?: string;
  readonly?: boolean;
  label?: string;
  disabled?: boolean;
  maxLength?: number;
  minLength?: number;
  customClass?: string;
  // for textarea
  rows?: number;
  cols?: number;
}
