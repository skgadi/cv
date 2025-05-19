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

/**
 * Generate n-grams (substrings) from a text for partial matching
 * @param text - The text to generate n-grams from
 * @param minLength - Minimum length of n-grams
 * @returns Array of n-grams
 */
export function generateNGrams(text: string, minLength: number = 3): string[] {
  const nGrams: string[] = [];
  const lowerText = text.toLowerCase();

  for (let i = 0; i < lowerText.length; i++) {
    for (let j = minLength; j <= lowerText.length - i; j++) {
      nGrams.push(lowerText.substring(i, i + j));
    }
  }
  return nGrams;
}
