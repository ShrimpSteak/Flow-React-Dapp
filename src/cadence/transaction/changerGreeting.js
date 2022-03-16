export const changeGreeting = `
import HelloWorld from 0x0af89e0e8daf8a93

transaction(newGreeting: String){
  prepare(acct: AuthAccount) {}

  execute{
    HelloWorld.changeGreeting(newGreeting: newGreeting)
    log("Hey, We change the greenting!")
  }

}`