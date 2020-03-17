Array.prototype.getObjectById = function (idKey, idValue) {

    let item = {};

    for (let i = 0; i < this.length; i++) {

        if (this[i][idKey] == idValue)
            item = this[i];
    }

    return item;
}

Array.prototype.setAllObjProp = function (propKey, propValue) {

    for (let i = 0; i < this.length; i++) {

        this[i][propKey] = propValue;
    }
}

Array.prototype.countObjProp = function (propKey, propValue) {

    let count = 0;

    for (let i = 0; i < this.length; i++) {

        if (this[i][propKey] === propValue) count++;
    }

    return count;
}

HTMLElement.prototype.show = function () {

    this.style.display = "block";
}

HTMLElement.prototype.hide = function () {

    this.style.display = "none";
}

Date.prototype.format = function(f) {
	if (!this.valueOf()) return " ";

	let weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
	let d = this;

	return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
		switch ($1) {
			case "yyyy": return d.getFullYear();
			case "yy": return (d.getFullYear() % 1000).zf(2);
			case "MM": return (d.getMonth() + 1).zf(2);
			case "dd": return d.getDate().zf(2);
			case "E": return weekName[d.getDay()];
			case "HH": return d.getHours().zf(2);
			case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
			case "mm": return d.getMinutes().zf(2);
			case "ss": return d.getSeconds().zf(2);
			case "a/p": return d.getHours() < 12 ? "오전" : "오후";
			default: return $1;
		}
	});
};

String.prototype.string = function(len){let s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};


function copyObject(fromObj, toObj) {

	for (let prop in fromObj) {

		if (fromObj.hasOwnProperty(prop)) {

			if (typeof(fromObj[prop]) == 'object' &&  fromObj[prop] != null) {

				copyObject(fromObj[prop], toObj[prop]);

			} else {

				toObj[prop] = fromObj[prop];
			}
		}
	}
}

function cloneObject(obj) {

	let clone = {};

	for (let i in obj) {

		if (obj.hasOwnProperty(i)) {

			if (typeof(obj[i]) == "object" && obj[i] != null) {

				clone[i] = cloneObject(obj[i]);

			} else {
				clone[i] = obj[i];
			}
		}
	}

	return clone;
}

// 이메일 유효성 검증 (true: 유효, false: 유효하지 않음)
function checkValidEmail(email) {

	let regex = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;

	return (email != '' && email != 'undefined' && regex.test(email));
}