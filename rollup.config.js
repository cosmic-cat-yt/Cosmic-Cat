import typescript from "@rollup/plugin-typescript";
import image from "@rollup/plugin-image";
import * as fs from "fs";

export default {
	input: "src/main.ts",
	output: {
		//dir: ".",
		file: "./cosmic-cat-neweng.user.js",
		format: "iife",
		banner: fs.readFileSync("./src/userscript_head.js")
	},
	plugins: [
		image(),
		typescript()
	]
};