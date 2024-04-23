# :white_flower: MagicDande Tutorial - Part2 :white_flower:

## F23 Creative Coding Lab Final
Hello again from Dande! I'm here to introduce you a new way of reproduction among our species: Object-Oriented Programming.

### Knowledge Covered:
- structure: Objected Oriented Programming

## Live Site Links
- [final-step1-OOP](https://carrotliu.github.io/Creative-Coding-Tutorial/Final/final-step1-OOP/).
- [final-step2-reorganize](https://carrotliu.github.io/Creative-Coding-Tutorial/Final/final-step2-Reorganize/).
- [final-step3-HTML](https://carrotliu.github.io/Creative-Coding-Tutorial/Final/final-step3-HTML/).

### What is Object-Oriented Programming and why?
Think of a class as a blueprint for a type of family member. For example, there might be a "Parent" class that defines the characteristics and behaviors common to all parents.
Since we already have "function", why do we need OOP? 

An object is like a specific instance of a family member. So, if we have a class called "Seed", an object would be a specific parent, like "seed1" or "Sarah."

### The Basic Structure
To define a class, you will use

There are three basic methods inside a class:

1. the constructor, which only runs for once (similar to our setup
   function) when a new instance of the class is constructed. In the constructor, we define all the variables that we want to use globally in all the methods. We write this.variableName omit the let when defining in the constructor.
2. the display ()

```JavaScript
class Seed {
    constructor() {
    }
    display() {
    }
    update() {
    }
}
```


### Making the seeds fly

```JavaScript
push();
stroke(255, 100);
strokeWeight(map(sin(this.seedPos + frameCount * 0.05), -1, 1, 0.01, 2));
line(
  this.coreX,
  this.coreY,
  this.seedX + this.coreX,
  this.seedY + this.coreY
);
pop();
```

```JavaScript
this.angle = PI * 2 + atan(this.coreY + this.seedY/this.coreX + this.seedX);
```

```JavaScript
this.angle = PI / 2 + atan(this.seedY/this.seedX);
```

fly

```JavaScript
if(this.seedX > 0){
  this.angle = PI / 2 + atan(this.seedY/this.seedX);
} else{
  this.angle = -PI / 2 + atan(this.seedY/this.seedX);
}
```

### HTML + Javascript?

### Text Input

```JavaScript
writeText() {
    if (!this.isWriting) {
      let writeAreaContainer = document.createElement("div");
      writeAreaContainer.id = "writeAreaContainer";
      let textArea = document.createElement("textarea");
      textArea.id = "textInputArea";
      let br = document.createElement("br");
      if (this.data.length != 0) {
        textArea.value = this.data[0];
      } else {
        textArea.placeholder =
          "Write about the characteristics you hope to possess";
      }
      textArea.style.width = "500px";
      textArea.style.height = "550px";
      // Create a submit button
      let submitButton = document.createElement("button");
      submitButton.id = "button-submit";
      submitButton.textContent = "Submit";
      submitButton.addEventListener(
        "click",
        function () {
          let userInput = textArea.value;
          this.data.push(userInput);

          this.isWriting = false;
          this.ifClicked = false;

          let divToRemove = document.getElementById("writeAreaContainer");
          if (divToRemove) {
            this.removedWriteDiv = divToRemove;
            divToRemove.parentNode.removeChild(divToRemove);
          }
        }.bind(this)
      );

      if (this.removedWriteDiv) {
        this.removedWriteDiv.innerHTML = "";
        this.removedWriteDiv.appendChild(textArea);
        this.removedWriteDiv.appendChild(submitButton);
        document.body.appendChild(this.removedWriteDiv);
        this.removedWriteDiv = null;
      } else {
        writeAreaContainer.innerHTML = "";
        writeAreaContainer.appendChild(textArea);
        writeAreaContainer.appendChild(br);
        writeAreaContainer.appendChild(submitButton);
        document.body.appendChild(writeAreaContainer);
      }

      this.isWriting = true;
    }
  }
```


