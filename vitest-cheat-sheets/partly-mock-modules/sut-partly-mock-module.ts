const getWithEmoji = (message: string) => {
  return `${message} 😎`;
};

export const stringOperations = {
  log: (message: string) => console.log(message),
  getWithEmoji,
};
