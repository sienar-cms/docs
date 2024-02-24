﻿const {md, defaultRenderer} = require("./util");

const defaultRender = md.renderer.rules.link_open || defaultRenderer;

module.exports = function (tokens, idx, options, env, self) {
	// Get the token, then get the href of the link
	const token = tokens[idx];
	const aIndex = token.attrIndex("href");
	const href = token.attrs[aIndex][1];

	// If the link starts with 'http', it's an external link
	// so we want those to open in a new tab
	if (href.match(/^http/) !== null) {
		token.attrPush(["target", "_blank"]);
		token.attrPush(["rel", "noopener"]);
	}

	return defaultRender(tokens, idx, options, env, self);
}