import logger from './logger';
import * as monaco from "monaco-editor";

const _32TIMINGBITS = "10101010101010101010101010101010";
const STARTBITS = "01110100011010000110010101110011011001010010000001100001011100100110010100100000011100110110111101101101011001010010000001110011011101000110000101110010011101000010000001100010011010010111010001110011";
const ENDBITS = "0111010001101000011001010111001101100101001000000110000101110010011001010010000001110011011011110110110101100101001000000110010101101110011001000010000001100010011010010111010001110011";
const canvas = document.getElementById('transmission-canvas');
const ctx = canvas.getContext("2d");
const sendBtn = document.getElementById('sendBtn');
const textBox = document.getElementById('container');
const editor = monaco.editor.create(document.getElementById("container"), {
  value: `#include <stdio.h>
#include <stdbool.h>
#include <string.h>
#include <ctype.h>

bool is_isogram(char phrase[])
{
  if (phrase == NULL)
  {
    return false;
  }

  unsigned int i;
  int letters_seen[26];
  for (i = 0; i < strlen(phrase); i++)
  {
    char letter = toupper(phrase[i]);
    if (isalpha(letter))
    {
      if (letter == letters_seen[letter - 97])
      {
        return false;
      }
      else
      {
        letters_seen[letter - 97] = letter;
      }
    }
  }

  return true;
}`,
  language: "cpp",
  theme: "vs-dark"
});

export default {
  canvas,
  ctx,
  sendBtn,
  textBox,
  STARTBITS,
  ENDBITS,
  _32TIMINGBITS,
  logger,
  editor
};