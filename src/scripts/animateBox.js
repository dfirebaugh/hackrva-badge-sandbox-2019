import convert from "./convert";
import constants from "./constants";
import logger from "./logger";
const { canvas, ctx, textBox } = constants;
const { binToAscii } = convert;

const updateStatus = status => {
  document.getElementById("status").textContent = status;
};

let start = null;
let index = 0;

export default (binary, transmitMsg) =>
  new Promise((resolve, reject) => {
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

      progressBar.setAttribute("style", `width: ${progress}%`);
    };
    const drawFrame = () => {
      const color = binary[index] == 0 ? "black" : "white"

      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
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
