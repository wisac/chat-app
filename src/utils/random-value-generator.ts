import { AppConstants } from 'common/constants';
import { randomInt } from 'crypto';
import { customAlphabet } from 'nanoid';

/**
 * A class for generate random values
 */
export class RandomValueGenerator {
   /**
    * Generates a unique and random string
    * @param length The length of the string
    * @param characterRange The acceptable characters to be used
    * @returns The random and unique string
    */
   static generateString(length: number, characterRange: string = AppConstants.CHARACTER_RANGE_FOR_ID): string {
      const nanoid = customAlphabet(characterRange, length);
      return nanoid();
   }

   /**
    * Generates a random integer
    * @param min The minimum range for the integer
    * @param max The maximum range for the integer
    * @returns A random integer ```n``` in the range ```min <= n <= max```
    */
   static generateInteger(min: number, max: number): number {
      return randomInt(min, max + 1);
   }
}
