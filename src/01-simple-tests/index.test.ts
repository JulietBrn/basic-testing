// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 7, action: Action.Add });

    expect(result).toBe(12);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 7, action: Action.Subtract });

    expect(result).toBe(-2);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 7, action: Action.Multiply });

    expect(result).toBe(35);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 15, b: 5, action: Action.Divide });

    expect(result).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 2,
      action: Action.Exponentiate
    });

    expect(result).toBe(4);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: '15', b: 'hello', action: '%' });

    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '15', b: 'hello', action: Action.Divide });

    expect(result).toBeNull();
  });
});
