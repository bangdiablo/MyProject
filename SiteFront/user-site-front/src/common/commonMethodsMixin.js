export const commonMethodsMixin = {

    methods: {

        // 숫자 세 자리수 컴마(,)
        numberWithCommas(x) {

            let value;

            try {

                value= x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            } catch (ex) {

                console.log(ex)
                console.log(x)
            }


            return value;
        },

        // 스토리지 사용 중 용량 표시
        expressUsed(value, unit) {

            let result;
            unit = unit === undefined ? " GB" : " 페이지";

            if (value == null)
                value = 0;

            result = this.numberWithCommas(value) + unit;;

            return result;
        },

        // 스토리지 용량 제한 표시
        expressLimit(value, unit) {

            let result;
            unit = unit === undefined ? " GB" : " 페이지";

            if (value == 0 || value === undefined || value === null)
                result = "제한없음";
            else
                result = this.numberWithCommas(value) + unit;

            return result;
        },

        // 날짜 표시
        expressDate(value, divideChar) {

            let dateArr = ['yyyy', 'MM', 'dd'],
                dateFormat;

            if (value === null)
                return "-";

            if (divideChar)
                dateFormat = dateArr.join(divideChar);
            else
                dateFormat = dateArr.join('.');

            return new Date(value).format(dateFormat);
        },
    }
}