// Uncomment the code below and write your tests
import { BankAccount, getBankAccount, InsufficientFundsError } from '.';

describe('BankAccount', () => {
  let account: BankAccount;

  beforeEach(() => {
    account = getBankAccount(100);
  })

  test('should create account with initial balance', () => {
    account = getBankAccount(200);
    expect(account.getBalance()).toBe(200);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(1000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.withdraw(1000)).toThrow('Insufficient funds: cannot withdraw more than ')

  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(10, account)).toThrow('Transfer failed')
  });

  test('should deposit money', () => {
    const result = account.deposit(50).getBalance();
    expect(result).toBe(150);
  });

  test('should withdraw money', () => {
    const result = account.withdraw(30).getBalance();
    expect(result).toBe(70);
  });

  test('should transfer money', () => {
    const accout2 = getBankAccount(0);
    account.transfer(10, accout2)

    const accountRes = account.getBalance()
    const account2Res = accout2.getBalance()
    expect(accountRes).toBe(90);
    expect(account2Res).toBe(10);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
