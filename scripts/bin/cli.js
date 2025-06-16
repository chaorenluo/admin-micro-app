require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
      module: "CommonJS",
      moduleResolution: "Node"
  }
})
console.log("Starting CLI")
require("../cli");