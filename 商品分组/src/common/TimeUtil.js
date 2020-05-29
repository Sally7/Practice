/* eslint-disable eol-last */
const TimeUtil = {
  toTimestamp(date) { //时间转时间戳
    return new Date(date).getTime()
  },
  toLocaleString (timestamp) {
    var newDate = new Date()
    newDate.setTime(timestamp)
    return newDate.toLocaleString()
  },
  formatNumber (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
	// var sjc = 1488481383 console.log(time.formatTime(sjc,'Y/M/D h:m:s')); 使用示例
  formatGeneralTime (number, format) { //一般的年月日显示
    var formateArr = ['Y', 'M', 'D', 'H', 'm', 's']
    var returnArr = []
    var date = new Date(Number(number))
    returnArr.push(date.getFullYear())
    returnArr.push(TimeUtil.formatNumber(date.getMonth() + 1))
    returnArr.push(TimeUtil.formatNumber(date.getDate()))
    returnArr.push(TimeUtil.formatNumber(date.getHours()))
    returnArr.push(TimeUtil.formatNumber(date.getMinutes()))
    returnArr.push(TimeUtil.formatNumber(date.getSeconds()))
    for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i])
    }
    return format
  },
  formatTime (number, format) { //显示带有今日明日昨天的到时分秒
    var date = new Date(number);
    var yesterdayDate = new Date(new Date().setDate(new Date().getDate() - 1));
    var tomorrowDate = new Date(new Date().setDate(new Date().getDate() + 1));

    var day = date.getFullYear() +TimeUtil.formatNumber(date.getMonth()) +TimeUtil.formatNumber(date.getDate());
    var today = new Date().getFullYear()+TimeUtil.formatNumber(new Date().getMonth())+TimeUtil.formatNumber(new Date().getDate());
    var yesterday = yesterdayDate.getFullYear() +TimeUtil.formatNumber(yesterdayDate.getMonth()) +TimeUtil.formatNumber(yesterdayDate.getDate());
    var tomorrow = tomorrowDate.getFullYear() +TimeUtil.formatNumber(tomorrowDate.getMonth()) +TimeUtil.formatNumber(tomorrowDate.getDate());
    // console.log('day='+day+',,,today='+today+',,,yesterday='+yesterday+',,,tomorrow='+tomorrow);
    //定义小时分钟秒的字符串
    let extraDate = TimeUtil.formatNumber(date.getHours()) +':'+ TimeUtil.formatNumber(date.getMinutes()) + (format.indexOf('s') > 0?':'+TimeUtil.formatNumber(date.getMinutes()):'');
    if (day == today){
      format = '今天 ' + (format.indexOf("H") != -1?extraDate:'')
    }else if(day == yesterday){
      format = '昨天 ' + (format.indexOf("H") != -1?extraDate:'')
    }else if(day == tomorrow) {
      format = '明天 ' + (format.indexOf("H") != -1?extraDate:'')
    }else{ //常规显示年月日
      let isCurrentYear = new Date().getFullYear() == date.getFullYear(); //如果是今年就省掉年份
      var formateArr = isCurrentYear?['M', 'D', 'H', 'm', 's']:['Y', 'M', 'D', 'H', 'm', 's'];
      let divisionSymbol = format.substr(1,1) //获取年份的分隔符(是Y-M还是Y:M等)
      format = isCurrentYear?(format.indexOf("Y") != -1?format.split('Y'+divisionSymbol)[1]:format):format;
      var returnArr = [];
      returnArr = isCurrentYear?[]:returnArr.concat(date.getFullYear())
      var date = new Date(number)
      returnArr.push(TimeUtil.formatNumber(date.getMonth() + 1))
      returnArr.push(TimeUtil.formatNumber(date.getDate()))
      returnArr.push(TimeUtil.formatNumber(date.getHours()))
      returnArr.push(TimeUtil.formatNumber(date.getMinutes()))
      returnArr.push(TimeUtil.formatNumber(date.getSeconds()))
      for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i])
      }
    }
    return format
  },
  /**
   * 获取时间
   * @returns {string}
   */
  toGetSimpleDate () {
    var newDate = new Date()
    var year = newDate.getFullYear()
    var month = newDate.getMonth()
    var day = newDate.getDay()
    if (month <= 9) month = '0' + month
    if (day <= 9) day = '0' + day
    return year + '-' + month + '-' + day
  },
  /**
   * 获取分钟
   * @returns {string}
   */
  toGetSimpleTime () {
    var newDate = new Date()
    var hours = newDate.getHours()
    var minutes = newDate.getMinutes()
    console.log({changdu: hours})
    if (hours <= 9) hours = '0' + hours
    if (minutes <= 9) minutes = '0' + minutes
    return hours + ':' + minutes
  },
  
  toGetDateLabel(pairStartDate,pairEndDate,format){ //获取一个含有起始时间-结束时间的字段
    var dateLabel = "";
    if (pairStartDate == 0 && pairEndDate == 9999999999999){
      dateLabel = "永久有效";
    }else{
      if (pairStartDate>0){
        dateLabel += TimeUtil.formatGeneralTime(pairStartDate,format);
      }else{
        dateLabel = "当前";
      }
      if (pairEndDate < 9999999999999 && pairEndDate>0){
        dateLabel += "-";
        dateLabel += TimeUtil.formatGeneralTime(pairEndDate,format);
      }
    }
    return dateLabel
  }
}
export default TimeUtil
