import convert from "./convert";
import constants from "./constants";
import logger from "./logger";
const { canvas, ctx, textBox } = constants;
const { binToAscii } = convert;

const updateStatus = status => {
  document.getElementById("status").textContent = status;
};

// Animation

let start = null;
let index = 0;

export default (binary, transmitMsg) =>
  new Promise(function(resolve, reject) {
    const binaryDiv = document.createElement("div");
    binaryDiv.value = binary;
    document.getElementById("bits").appendChild(binaryDiv);

    updateStatus(transmitMsg);
    logger(transmitMsg);
    logger("Binary: ", binary);
    logger("Value converted back: ", binToAscii(binary));
    logger("length: ", binary.length);
    const updateProgress = progress => {
      const progressBar = document.getElementById("progressBar");
      // console.log(progressBar);
      progressBar.setAttribute("style", `width: ${progress}%`);
    };
    const drawFrame = () => {
      if (binary[index] == 0) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      index++;
    };
    function step(timestamp) {
      if (!start) start = timestamp;
      if (index < binary.length) {
        drawFrame();
        updateProgress((100 * index) / binary.length);
        window.requestAnimationFrame(step);
      } else {
        index = 0;
        resolve();
      }
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    window.requestAnimationFrame(step);
  });
