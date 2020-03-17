export default {
    methods : {

        dateFormat(date, dateFormat) {

            let d = null;

            // check date
            if (typeof date === 'object' && date instanceof Date) {
                // do nothing
            } else {

                if (date === null) {
                    return "-";
                } else if (typeof date === 'string') {

                    try {
                        date = new Date(date);
                    } catch (e) {
                        return "-";
                    }
                }
            }

            if (typeof dateFormat === 'undefined') {
                dateFormat = 'yyyy-MM-dd';
            }

            d = date;

	        return dateFormat.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
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
                    case "a/p": return d.getHours() < 12 ? "AM" : "PM";
                    default: return $1;
                }
	        });
        },
    }
}