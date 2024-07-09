export const baseApi = {
  get: (url, options) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        fetch(`${process.env.BASE_URL}/${url}`, options)
          .then((r) => r.json())
          .then(resolve);
      }, 1000);
    });
  },
};
