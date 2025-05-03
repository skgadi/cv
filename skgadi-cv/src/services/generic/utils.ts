import { Notify } from 'quasar';
import { copyToClipboard } from 'quasar';

export const copyText = async (text: string) => {
  try {
    await copyToClipboard(text);
    Notify.create({
      message: 'Text copied to clipboard',
      color: 'green',
      position: 'top',
      timeout: 2000,
    });
  } catch (error) {
    console.error('Failed to copy text:', error);
    Notify.create({
      message: 'Failed to copy text',
      color: 'red',
      position: 'top',
      timeout: 2000,
    });
  }
};
