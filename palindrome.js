function reversestr(str){
    var listofChar = str.split('');
    var reverselistOfchar = listofChar.reverse();
    var reversedstr = reverselistOfchar.join('');
    return reversedstr;
}
function ispalindrome(str){
    var reverse = reversestr(str);
    return str ===  reverse;

}
function convertDatetoStr(date){

    var datestr ={ day:'',month:'',year:''};
    if(date.day<10){
        datestr.day='0'+date.day;
    }
    else{
        datestr.day=date.day.toString();
    }
    if(date.month<10){
        datestr.month='0'+date.month;
    }
    else{
        datestr.month=date.month.toString();
    }
datestr.year=date.year.toString();
return datestr
}
function getAllDateformats(date){
    var datestr =convertDatetoStr(date);

    var ddmmyyyy=datestr.day+datestr.month+datestr.year;
    var mmddyyyy=datestr.month+datestr.day+datestr.year;
    var yyyymmdd=datestr.year+datestr.month+datestr.day;
    var ddmmyy=datestr.day+datestr.month+datestr.year.slice(-2);
    var mmddyy=datestr.month+datestr.day+datestr.year.slice(-2);
    var yymmdd =datestr.year.slice(-2)+datestr.month+datestr.day;

    return[ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,
        yymmdd];
}
function checkPalindronesforallDateformats(date){
    var lisofPalindromes=getAllDateformats(date);

    var flag = false;

    for(var i=0;i<lisofPalindromes.length;i++){
        if(ispalindrome(lisofPalindromes[i])){
            flag=true;
            break;
        }
    }

    return flag;
}
function isLeapyear(year){
    if(year%400===0){
        return true;
    }

if(year%100===0){
    return false;
}
if(year%4===0){
    return true;
}
return false;
}
function getNextdate(date){
    var day=date.day+1;
    var month=date.month;
    var year=date.year

    var daysINmonth=[31,28,31,30,31,30,31,31,30,31,30,31];
     
    if(month===2){
        if(isLeapyear(year)){
            if(day>29){
                day=1;
                month++;
            }
        }
        else{
            if(day>28){
                month++;
            }
        }
    }
    else{
        if(day>daysINmonth[month-1]){
            day=1;
            month++;

        }
    }

    if(month>12){
        month=1;
        year++;
    }
    return {
        day:day,
        month:month,
        year:year
    };
}
function getNextpalindromeDate(date){
    var ctr=0;
    var nextdate=getNextdate(date);

    while(1){
        ctr++;
        var ispalindrome=checkPalindronesforallDateformats(nextdate);
        if(ispalindrome){
            break;
        }
        nextdate=getNextdate(nextdate);
    }

    return[ctr,nextdate];
}
var dateInput = document.querySelector("#bday-input");
var showbtn = document.querySelector("#check-btn");
var result = document.querySelector("#output");

function clickHandler(){
    var bodtStr = dateInput.value;

    if(bodtStr!=='')
    var listofDate=bodtStr.split('-');

    var date={
        day:Number(listofDate[2]),
        month:Number(listofDate[1]),
        year:Number(listofDate[0])
    }
    var ispalindrome = checkPalindronesforallDateformats(date);

    if(ispalindrome){
        result.innerText = ' yay! your birthday is a palindrome!!'
    }
    else{
        var [ctr,nextdate] = getNextpalindromeDate(date);
        result.innerText= `The nearest palindrome date is ${nextdate.day}-${nextdate.month}-${nextdate.year}, you missed it by ${ctr} day's! 🙂`;
    }
}
showbtn.addEventListener('click',clickHandler);