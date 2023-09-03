function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const firstDelay = parseInt(this.elements.delay.value);
  const step = parseInt(this.elements.step.value);
  const amount = parseInt(this.elements.amount.value);

  if (isNaN(firstDelay) || isNaN(step) || isNaN(amount)) {
    notiflix.Notify.failure("Please enter valid values.");
    return;
  }

  const promises = [];

  for (let i = 0; i < amount; i++) {
    const currentDelay = firstDelay + i * step;
    const promise = createPromise(i + 1, currentDelay);

    promise
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    promises.push(promise);
  }
  console.log(promises);
});
