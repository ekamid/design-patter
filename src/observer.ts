interface Observable {
  attach(observer: Observer): void;
  notify(info: number, event: string): void;
}

interface Observer {
  update(observable: Observable, info: number, event: string): void;
}

class BankAccount implements Observable {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  notify(info: number, event: string): void {
    this.observers.forEach((observer) => {
      observer.update(this, info, event);
    });
  }

  withdraw(money: number): void {
    this.notify(money, "WITHDRAW");
  }
}

class SMSNotifire implements Observer {
  update(observable: Observable, info: number, event: string): void {
    console.log("sms notifire");
    console.log(`${info}, ${event}`);
  }
}

class EmailNotifire implements Observer {
  update(observable: Observable, info: number, event: string): void {
    console.log("email notifire");
    console.log(`${info}, ${event}`);
  }
}

export const bankAccountExample = (): void => {
  const bankAccount = new BankAccount();
  const smsNotifire = new SMSNotifire();
  const emailNotifire = new EmailNotifire();

  bankAccount.attach(smsNotifire);
  bankAccount.attach(emailNotifire);

  bankAccount.withdraw(500);
  bankAccount.withdraw(300);
};
