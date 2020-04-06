// /* eslint-disable max-params */

// import { randomFromArray } from '../../../GAS | Library/v02/arr/randomFromArray';

// import { single } from './helpers';
// import { tasks } from './tasks';
// import { TARGET_SHEETS } from './config';

// /**
//  * @typedef {import('./tasks').ExperimentTasks} ExperimentTasks
//  */

// /* ******************** TESTY POJEDYŃCZE *********** */

// /**
//  * Tablica docelowych arkuszy (tylko zawierających dane)
//  * @type {array[]} getTargets
//  */

// const getTargets = Object.entries(TARGET_SHEETS).filter(
// 	([, { status }]) => status
// );

// // Sety funkcji do losowania
// const randomFnLoc = [tasks.l1, tasks.l2, tasks.l3];
// const randomFnHub = [tasks.h1, tasks.h2, tasks.h3];
// const randomFnExt = [tasks.e1, tasks.e2, tasks.e3];
// const randomFnCache = [tasks.c1];

// /**
//  * Template losowego wyboru funkcji do wykonania
//  * @param {ExperimentTasks[]} functionsSet
//  */

// const runRandom = functionsSet => () => {
// 	const [, target] = randomFromArray(getTargets, 1);
// 	const [task] = randomFromArray(functionsSet, 1);

// 	single(target, task);
// };

// const randomExternal = runRandom(randomFnExt);
// const randomLocal = runRandom(randomFnLoc);
// const randomHub = runRandom(randomFnHub);
// const randomCache = runRandom(randomFnCache);

// export { randomExternal, randomLocal, randomHub, randomCache };
