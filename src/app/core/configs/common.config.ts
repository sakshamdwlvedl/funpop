import { ButtonConfig } from '../interfaces/dynamics.interface';

export const COMMON_CONFIG = {
  BUTTON: {
    SEE_MORE: {
      padding: '2px 10px',
      borderRadius: '16px',
      bgColor: 'transparent',
      borderColor: '#b4b4b4',
      textColor: 'black',
      fontSize: '14px',
      icon: 'pi pi-angle-right',
      iconPosition: 'right',
      hover: {
        bgColor: 'black',
        textColor: 'white',
        borderColor: 'black',
      },
    },
  } as { [key: string]: ButtonConfig },
};
