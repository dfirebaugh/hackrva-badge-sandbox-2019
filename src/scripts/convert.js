const decToBin = num => parseInt(num, 10).toString(2);
const asciiToBin = str => {
  const pad = '00000000';
  return str.split('').map(c => {
    const bin = decToBin(c.charCodeAt(0));
    return pad.substring(bin.length) + bin;
  }).join('');
};

const binToAscii = bin => {
  return bin.replace(/[01]{8}/g, function (v) {
    return String.fromCharCode(parseInt(v, 2));
  });
};

export default {
  asciiToBin,
  binToAscii
};