declare let foo: number

declare function greet(greeting: string): void

declare namespace myLib {
  function makeGreeting(s: string): string
  let numberOfGreetings: number
}

declare function setWidget(n: number): void
declare function setWidget(s: string): void

declare class Greeter {
  constructor(greeting: string)
  greeting: string
  showGreeting(): void
}