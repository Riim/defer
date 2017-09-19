import { error } from '@riim/logger';

let queue: Array<Function> | null;

function run() {
	let track = queue!;

	queue = null;

	for (let callback of track) {
		try {
			callback();
		} catch (err) {
			error(err);
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
