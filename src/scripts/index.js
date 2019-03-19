import "../styles/index.scss";
import animateBox from "./animateBox";
import convert from "./convert";
import constants from "./constants";
import logger from "./logger";
import md5 from "md5";

const { asciiToBin } = convert;
const { sendBtn, STARTBITS, ENDBITS, editor } = constants;

sendBtn.addEventListener("click", () => {
  logger("value: ", editor.getValue());
  logger("hash: ", md5(editor.getValue()));
  animateBox(STARTBITS, "transmitting start bits").then(() => {
    animateBox(asciiToBin(md5(editor.getValue())), "transmitting hash").then(
      () => {
        animateBox(
          asciiToBin(editor.getValue()),
          "transmitting main payload"
        ).then(() => {
          animateBox(ENDBITS, "transmitting end bits");
        });
      }
    );
  });
});
