// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';
import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  let account: BankAccount;
  const defaultBalance = 200;

  beforeEach(() => {
    account = getBankAccount(defaultBalance);
  });

  test('should create account with initial balance', () => {
    account = getBankAccount(200);
    expect(account.getBalance()).toBe(200);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(defaultBalance + 150)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.withdraw(defaultBalance + 150)).toThrow(
      'Insufficient funds: cannot withdraw more than ',
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(10, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const result = account.deposit(50).getBalance();
    expect(result).toBe(defaultBalance + 50);
  });

  test('should withdraw money', () => {
    const result = account.withdraw(30).getBalance();
    expect(result).toBe(defaultBalance - 30);
  });

  test('should transfer money', () => {
    const accout2 = getBankAccount(0);
    account.transfer(10, accout2);

    const accountRes = account.getBalance();
    const account2Res = accout2.getBalance();
    expect(accountRes).toBe(defaultBalance - 10);
    expect(account2Res).toBe(10);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mockBalance = 100;
    const requestMock = 1;

    (random as jest.Mock)
      .mockReturnValueOnce(mockBalance)
      .mockReturnValueOnce(requestMock);

    const result = await account.fetchBalance();
    expect(result).toBe(mockBalance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockBalance = 100;

    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(mockBalance);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(mockBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const mockBalance = null;

    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(mockBalance);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
