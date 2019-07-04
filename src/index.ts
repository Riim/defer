import { logError } from './utils';

export { configure } from './config';

let queue: Array<Function> | null;

function run() {
	let track = queue!;

	queue = null;

	for (let callback of track) {
		try {
			callback();
		} catch (err) {
			logError(err);
		}
	}
}

export function defer(callback: Function) {
	if (queue) {
		queue.push(callback);
	} else {
		queue = [callback];
		setTimeout(run, 1);
	}
}
