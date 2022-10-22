let no = "hello";

function scope() {
  no = "ok";
}
scope();
console.log(no, "world");
