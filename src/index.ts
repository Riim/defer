import { logError } from '@riim/error-logger';

let queue: Array<{
	callback: Function;
	context: any;
}> | null;

function run() {
	let track = queue!;

	queue = null;

	for (let item of track) {
		try {
			item.callback.call(item.context);
		} catch (err) {
			logError(err);
		}
	}
}

export function defer(callback: Function, context?: any) {
	if (queue) {
		queue.push({ callback, context });
	} else {
		queue = [{ callback, context }];
		setTimeout(run, 1);
	}
}
