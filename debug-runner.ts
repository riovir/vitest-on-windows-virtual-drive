import { VitestTestRunner } from 'vitest/runners';

class DebugRunner extends VitestTestRunner {
	async importFile(filepath, source) {
		try {
			console.info(`Importing ${filepath} as ${source}`);
			const aModule = await super.importFile(filepath, source);
			console.log('Loaded', aModule);
			return aModule;
		}
		catch(err) {
			/*
			 - Windows 10
			 - Z: drive has been created by: "subst Z: E:\workspaces"
			 - E: drive is a physical, non-partitioned drive

			 Tests run fine from the E: drive and fail to load from Z:, but notice the stack trace:			
			file:///E:/workspaces/vitest-on-windows-virtual-drive/node_modules/@vitest/runner/dist/index.js:176:22
			Clue?: even when the tests run from Z: the stack trace shows the path from E:
			*/
			console.error('something is wrong...', err);
			throw err;
		}
	}
}

export default DebugRunner;