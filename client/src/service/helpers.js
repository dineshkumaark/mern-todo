import moment from 'moment';

export const dateFormat = (date, format = 'Do MMM YYYY') => {
	return moment(date).format(format);
};

export const dateFormatString = (date, stringFormat = '', format = 'Do MMM YYYY') => {
	return stringFormat ? moment(date).format(format) : 'Provide string format';
};

export const timeFrom = date2 => {
	return moment(date2).from();
};

export const timeToNow = (date, helpText = true) => {
	return moment(date).toNow(helpText);
};

export const checkToday = (date, format) => {
	let d = moment(date, format);
	let today = moment();
	return d.diff(today, 'days') === 0;
};

export const generateColor = (str = '', alpha) => {
	var hash = 0;
	for (var i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	var colour = '#';
	for (var i = 0; i < 3; i++) {
		var value = (hash >> (i * 8)) & 0xff;
		colour += ('00' + value.toString(16)).substr(-2);
	}
	// return colour;

	return stringToHslColor(str, 50, 50, alpha);
};

export const stringToHslColor = (str, s, l, a = 1) => {
	var hash = 0;
	for (var i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}

	var h = hash % 360;
	return 'hsla(' + h + ', ' + s + '%, ' + l + '%,' + a + ')';
};

export const IsValidEmail = email => {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

export const getRandomInt = max => {
	return Math.floor(Math.random() * Math.floor(max));
};

export const bytesToKBConverter = bytes => {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Byte';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return bytes / Math.pow(1024, i);
};

export const razorPayApiKey = 'rzp_test_jIMX662l7qsjSw';

const gcd = (a, b) => {
	return b ? gcd(b, a % b) : a;
};

export const aspectRatio = (width, height) => {
	const divisor = gcd(width, height);

	return `${width / divisor}:${height / divisor}`;
};

export const passwordValidation = () => {
	return {
		validators: {
			password: {
				// name the rule
				message: 'Password must have at least one Capital letter and at least one number',
				rule: (val, params, validator) => {
					return validator.helpers.testRegex(val, /(?=.*\d)(?=.*[A-Z])/gm) && params.indexOf(val) === -1;
				},
				messageReplace: (message, params) => message.replace(':values', this.helpers.toSentence(params)), // optional
				required: true // optional
			}
		}
	};
};

export const timeout = ms => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

export const closest = (el, className) => {
	if (el.classList.contains(className)) {
		return el;
	} else {
		var p = el.parentElement;

		while (p && !p.classList.contains(className)) {
			let o = p;
			p = o.parentElement;
		}
		return p;
	}
};

export function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}

export function getElementStyle(el, property) {
	return window.getComputedStyle(el, null).getPropertyValue(property);
}

export const generateFilename = str => {
	return `dflow-${str
		.slice(0, str.length - 4)
		.replace(/[.]/g, '')
		.replace(/\(|\)/g, '')
		.replace(/\s+/g, '-')
		.toLowerCase()}-${+new Date()}`;
};
