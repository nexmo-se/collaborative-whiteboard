export function determinePreferredFrameRate(numberOfSubscribers) {
  console.log('these are the number of streams ' + numberOfSubscribers);
  return numberOfSubscribers > 4 ? 7 : 15;
}

export function determinePreferredResolution(numberOfSubscribers) {
  return numberOfSubscribers >= 4
    ? { width: 320, height: 240 }
    : { width: 640, height: 360 };
}
