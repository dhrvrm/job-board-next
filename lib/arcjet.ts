import arcjet, {
	detectBot,
	fixedWindow,
	protectSignup,
	sensitiveInfo,
	shield,
	slidingWindow,
} from '@arcjet/next';

// Re-export the rules to simplify imports inside handlers
export {
	detectBot,
	fixedWindow,
	protectSignup,
	sensitiveInfo,
	shield,
	slidingWindow,
};

export default arcjet({
	key: process.env.ARCJET_KEY!,
	rules: [],
});
