import '../styles/index.scss';
import animateBox from './animateBox';
import convert from './convert';
import constants from './constants';
import * as monaco from 'monaco-editor';
import logger from './logger';

const { asciiToBin } = convert;
const { sendBtn, STARTBITS, ENDBITS, _32TIMINGBITS } = constants;

const editor = monaco.editor.create(document.getElementById('container'), {
  language: 'cpp',
  theme: "vs-dark",
});

sendBtn.addEventListener('click', () => {
  logger("value: ", editor.getValue());
  animateBox(_32TIMINGBITS, "transmitting 32 timing bits")
    .then(() => {
      animateBox(STARTBITS, "transmitting start bits")
        .then(() => {
          animateBox(asciiToBin(editor.getValue()), "transmitting main payload")
            .then(() => {
              animateBox(ENDBITS, "transmitting end bits");
            });
        });
    });
}
);
