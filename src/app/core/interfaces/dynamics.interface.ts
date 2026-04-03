interface ControlsCommonConfig {
  isVisible?: boolean;
  leaveSpaceForErrors?: boolean;
}

interface StateStyle {
  borderColor?: string;
  bgColor?: string;
  textColor?: string;
}

export interface InputConfig extends ControlsCommonConfig {
  placeholder?: string;
  staticPlaceholder?: string;
  keywords?: string[];
  type?: 'text' | 'number' | 'email' | 'password';
  icon?: string;
  showCrossIcon?: boolean;
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

export interface ButtonConfig {
  padding?: string;
  borderRadius?: string;
  borderColor?: string;
  bgColor?: string;
  textColor?: string;
  fontSize?: string;
  fontWeight?: number | string;
  iconSize?: string;
  cursor?: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  hover?: StateStyle;

  breakSM?: ButtonConfig;
}
