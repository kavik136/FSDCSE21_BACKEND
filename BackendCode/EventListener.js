// const EvenEmitter=require("events");
// const event=new EventEmitter
const EvenEmitter=require("events");
class Button extends EventEmitter
{
click()
{
    console.log("/n call button click event");
    this.emit("click");
}
mouseover()
{
    console.log("/ncall button click event");
    this.emit("mouseover");
}
on(eventName, callback)
{

}
}
