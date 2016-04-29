    //********************************************************************************//
    //* Name :      Yatz Demsky                                                                 *//
    //* Zenit login : int222_141g06                                                    *//
    //********************************************************************************//

function validationForPayment() {   

    //********************************************************************************//
    //*   You will need to call the functions that validate the following:           *//
    //********************************************************************************//
    //*        (1)              (2)              (3)             (4)                 *//
    //********************************************************************************//
    //*   Property value  -  Down payment  -  Interest rate -  Amortization          *//
    //********************************************************************************//
    //*   If there are no errors, then call                                          *//
    //*                                                                              *//
    //*      detailPaymentCalculation(...., ......, ......, ......);                 *//
    //*                                                                              *//
    //*   and make sure to pass the four values in the order shown above.            *//
    //*                                                                              *//
    //********************************************************************************//
    //*   If there are errors, simply update the comments area with the message:     *//
    //*   Please complete the form first and then click on Calculate Monthly Payment *//
    //*                                                                              *//
    //********************************************************************************//
    var errorMsg = "";
    errorMsg = validatePropValue(errorMsg);
    errorMsg = validateDownPay(errorMsg);
    errorMsg = validateIntRate(errorMsg);
    errorMsg = validateAmortization(errorMsg);

    if (errorMsg == "") {
        clearErrorMsg(errorMsg);
        var calcPropValue = document.mortgage.propValue.value;
        var calcDownPay = document.mortgage.downPay.value;
        var calcIntRate = document.mortgage.intRate.value;
        var calcAmortization = document.mortgage.amortization.value;
        detailPaymentCalculation(calcPropValue,calcDownPay,calcIntRate,calcAmortization);
    } else {
        showErrorMsg(errorMsg);
        document.forms[0].payment.value = "";
    }


} // End of validationForPayment function

    //********************************************************************************//
    //*   Do not modify any statements in detailPaymentCalculation function          *//
    //********************************************************************************//

function detailPaymentCalculation(mortAmount,mortDownPayment,mortRate,mortAmortization) {

    //********************************************************************************//
    //*   This function calculates the monthly payment based on the following:       *//
    //*                                                                              *//
    //*               M = P [ i(1 + i)n ] / [ (1 +  i)n - 1]                         *//
    //*                                                                              *//
    //********************************************************************************//
     var paymentError = "";
     var v = mortAmount * 1;
     var d = mortDownPayment * 1;
     var i = mortRate * 1;
     var y = mortAmortization * 1;
     var a = v - d;
         i = i/100/12;
         n = y * 12;
     var f = Math.pow((1+i),n);

     var p = (a * ((i*f)/(f-1))).toFixed(2);

     if (p=="NaN" || p=="Infinity") {
         paymentError = "Please complete the form before attempting to calculate the monthly payment" 
         document.forms[0].comments.value = paymentError;
         document.forms[0].payment.value = "";
     }
     else {
           document.forms[0].payment.value = p;
           document.forms[0].comments.value = "";
     }

} // End of detailPaymentCalculation function



function completeFormValidation() {

    //********************************************************************************//
    //*                                                                              *//
    //* This function calls the different functions to validate all required fields  *//
    //*                                                                              *//
    //* Once you have validated all field,                                           *//
    //* determine if any error(s) have been encountered                              *//
    //*                                                                              *//
    //* If any of the required fields are in error:                                  *//
    //*                                                                              *//
    //*    present the client with a list of all the errors in reserved area         *//
    //*         on the form and                                                      *//
    //*          don't submit the form to the CGI program in order to allow the      *//
    //*          client to correct the fields in error                               *//
    //*                                                                              *//
    //*    Error messages should be meaningful and reflect the exact error condition.*//
    //*                                                                              *//
    //*    Make sure to return false                                                 *//
    //*                                                                              *//
    //* Otherwise (if there are no errors)                                           *//
    //*                                                                              *//
    //*    Change the 1st. character in the field called client to upper case        *//
    //*                                                                              *//
    //*    Change the initial value in the field called jsActive from OFF to ON      *//
    //*                                                                              *//
    //*    When a browser submits a form to a CGI program, disabled fields           *//
    //*    like the payment field are not included. To insure that the payment field *//
    //*    is sent to the CGI, include the following JavaScript statement            *//
    //*    document.forms[0].payment.disabled = false;                               *//
    //*                                                                              *//
    //*    Make sure to return true in order for the form to be submitted to the CGI *//
    //*                                                                              *//
    //********************************************************************************//

    var errorMsg = "";
    errorMsg = validateUserid(errorMsg);
    errorMsg = validateClient(errorMsg);
    errorMsg = validatePropValue(errorMsg);
    errorMsg = validateDownPay(errorMsg);
    errorMsg = validateIncome(errorMsg);
    errorMsg = validatePropDetail(errorMsg);
    errorMsg = validatePropLocation(errorMsg);
    errorMsg = validateMortYear(errorMsg);
    errorMsg = validateMortMonth(errorMsg);
    errorMsg = validateIntRate(errorMsg);
    errorMsg = validateAmortization(errorMsg);

    if (errorMsg != "") {
        showErrorMsg(errorMsg);
        return false;
    } else {
        clearErrorMsg(errorMsg);
        document.forms[0].payment.disabled = false;
        document.getElementById('jsActive').value = 'on';
        return true;
    }

} // End of completeFormValidation

// This Function validates UserId field
function validateUserid(errorMsg) {
    var tempUserid = document.mortgage.userId.value;
    tempUserid = tempUserid.trim();
    var tempLength = tempUserid.length;
    var formatUserid = tempUserid.split('-');
    var nameMsg = "Please enter your UserID!";

    if (tempLength == 0) {
        errorMsg += "<p><mark>UserId field: </mark>Field is empty <br />" + nameMsg + "</p>"; 
    } else {
        if (tempLength > 10 || tempLength < 10) {
            errorMsg += "<p><mark>UserId field: </mark>Must be 10 character long <br />" + nameMsg + "</p>";
        } else {
            if (tempUserid[4] != '-') {
                errorMsg += "<p><mark>In UserId field: </mark>Has to have hyphen '-' after 4th digit<br />" + nameMsg + "</p>";
            } else if ((isNaN(formatUserid[0]) == true) || (isNaN(formatUserid[1]) == true)) {
                errorMsg += "<p><mark>UserId field: </mark>Position 1,2,3,4 and 6,7,8,9,10 must be digits only<br />" + nameMsg + "</p>";
            }
        }
    }
    if (errorMsg == "") {
        var tempLeft = eval(parseInt(tempUserid[0])+parseInt(tempUserid[1])+parseInt(tempUserid[2])+parseInt(tempUserid[3]));
        var tempRight = eval(parseInt(tempUserid[5])+parseInt(tempUserid[6])+parseInt(tempUserid[7])+parseInt(tempUserid[8])+parseInt(tempUserid[9]));
        if (tempLeft < 1 || tempRight < 1) {
            errorMsg += "<p><mark>UserId field: </mark>The sum of the numbers to the left and right of the hyphen '-' must be greater than 0 <br />" + nameMsg + "</p>";
        } else {
            var tempFinal = tempLeft + tempLeft + 1;
            if ((tempFinal) != tempRight) {
                errorMsg += "<p><mark>UserId field: </mark>The sum of the numbers to the right of the '-' must be (double plus 1) the sum of the numbers to the left of the '-' <br />" + nameMsg + "</p>";
            }
        }
    }
    return errorMsg;
}

//This function validates Client's name field
function validateClient(errorMsg) {
    var tempClient = document.mortgage.client.value;
    tempClient = tempClient.trim();
    var tempClientLength = tempClient.length;
    var clientMsg = "Please enter your Name!";
    tempClient = tempClient.toUpperCase();

    if (tempClientLength == 0) {
        errorMsg += "<p><mark>Name field: </mark>Field is empty <br />" + clientMsg + "</p>"; 
    } else {
        if (tempClientLength < 3) {
            errorMsg += "<p><mark>Name field: </mark>Name must be 3 or more characters <br />" + clientMsg + "</p>";
        } else {
            if (tempClient.charAt(tempClientLength-1) == "'" || tempClient.charAt(tempClientLength-1) == "-" || tempClient.charAt(0) == "'" || tempClient.charAt(0) == "-") {
                errorMsg += "<p><mark>Name field: </mark>Apostrophe or hyphen at the beginning or the end of the name is not valid <br />" + clientMsg + "</p>";
            } else {
                var chk = characterValidation (tempClient, tempClientLength);
                if (chk > 0) {
                    errorMsg += "<p><mark>Name field: </mark>Must use only letters, apostrophe or hyphen is acceptable after 3rd letter but not the last letter<br />" + clientMsg + "</p>";
                } else {
                    tempClient = tempClient.toLowerCase();
                    tempClient = tempClient[0].toUpperCase() + tempClient.slice(1);
                    document.mortgage.client.value = tempClient;
                }
            }
        }
    }
    return errorMsg;
}

// This function calls from validateClient function
function characterValidation (str, len) {
    var tempChk = 0;
    var tempWord = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcedfghijklmnopqrstuvwxyz-'";

    for (var i=0;i<3;i++) {
        if (str.charCodeAt(i) < 65 || str.charCodeAt(i) > 90) {
            tempChk =1;
        }
    }
    for (var i = 3; i < len-1; i++) {
        if (tempWord.indexOf(str.charAt(i), 0) == -1) {
            tempChk =1;
        }
    }
    return tempChk;
}

//This function validates property value field
function validatePropValue(errorMsg) {
    var tempPropValue = document.mortgage.propValue.value;
    tempPropValue = tempPropValue.trim();
    var tempPropValueLength = tempPropValue.length;
    var tempDownPayCal = document.mortgage.downPay.value;
    var propValueMsg = "Please enter value of your Property!";

    tempDownPayCal = parseInt(tempDownPayCal) + 65000;

    if (tempPropValueLength == 0) {
        errorMsg += "<p><mark>Property Value field: </mark>Field is empty <br />" + propValueMsg + "</p>";
    } else {
        if (isNaN(tempPropValue) == true || tempPropValue < 0 || (tempPropValue % 1) != 0) {
            errorMsg += "<p><mark>Property Value field: </mark>Must be numeric, positive, whole number <br />" + propValueMsg + "</p>";
        } else {
            if (tempPropValue <  tempDownPayCal) {
                errorMsg += "<p><mark>Property Value field: </mark>Must be at least 65,000 dollars more that the down payment <br />" + propValueMsg + "</p>";
            }
        }
    }
    return errorMsg;
}

//This function validates down payment field
function validateDownPay(errorMsg) {
    var tempDownPay = document.mortgage.downPay.value;
    tempDownPay = tempDownPay.trim();
    var tempDownPayLength = tempDownPay.length;
    var tempPropValueCal = document.mortgage.propValue.value;
    var downPayMsg = "Please enter your Downpayment!";

    tempPropValueCal = parseInt(tempPropValueCal) * 0.1;

    if (tempDownPayLength == 0) {
        errorMsg += "<p><mark>Downpayment field: </mark>Field is empty <br />" + downPayMsg + "</p>";
    } else {
        if (isNaN(tempDownPay) == true || tempDownPay < 0 || (tempDownPay % 1) != 0) {
            errorMsg += "<p><mark>Downpayment field: </mark>Must be numeric, positive, whole number <br />" + downPayMsg + "</p>";
        } else {
            if (tempDownPay < tempPropValueCal) {
                errorMsg += "<p><mark>Downpayment field: </mark>Must be at least 10% of the value of the property <br />" + downPayMsg + "</p>";
            }
        }
    }
    return errorMsg;
}

//This function validates income selection
function validateIncome(errorMsg) {
    var selectedOption = document.mortgage.income.selectedIndex;
    var incomeMsg = "Please select your Income!";

    if (selectedOption == -1) {
        errorMsg += "<p><mark>Income range: </mark>None selected <br />" + incomeMsg + "</p>";
    }
    return errorMsg; 
}

//This function validates property details selection
function validatePropDetail(errorMsg) {
    var selectedPropDetail = document.mortgage.propDetails.length;
    var propDetailMsg = "Please choose Property!";
    var counter = 0;
    var chk = 0;

    for (var j=0;j<selectedPropDetail;j++) {
        if (document.mortgage.propDetails[j].checked == true) {
            counter++;
        }
    }
    if (counter == 0) {
        errorMsg += "<p><mark>Property details: </mark>None selected <br />" + propDetailMsg + "</p>";
    } else {
        for (var k=0;k<6;k++) {
            if(document.mortgage.propDetails[k].checked == true) {
                chk++;
            }
        }
        if (document.mortgage.propDetails[6].checked == true && chk > 0) {
            errorMsg += "<p><mark>Property details: </mark>When selecting all of the above, deselect others <br />" + propDetailMsg + "</p>"; 
        } else {
            return errorMsg;
        }
    }
    return errorMsg;   
}

//This function validates property location
function validatePropLocation(errorMsg) {
    var selectedPropLocation = document.mortgage.propLocation.length;
    var propLocationMsg = "Please choose Location!";
    var ctr = 0;

    for (var l=0;l<selectedPropLocation;l++) {
        if (document.mortgage.propLocation[l].checked == true) {
            ctr++;
        }
    }
    if (ctr == 0) {
        errorMsg += "<p><mark>Property location: </mark>None selected <br />" + propLocationMsg + "</p>";
    }
    return errorMsg;
}

//This function validates year field
function validateMortYear(errorMsg) {
    var tempMortYear = document.mortgage.mortYear.value;
    tempMortYear = tempMortYear.trim();
    var tempMortYearLength = tempMortYear.length;
    var mortYearMsg = "Please enter the Year!";
    var tempDate = new Date();
    tempDate = tempDate.getFullYear();
    var tempDateNext = parseInt(tempDate) + 1;

    if (tempMortYearLength == 0) {
        errorMsg += "<p><mark>Mortgage year field: </mark>Field is empty <br />" + mortYearMsg + "</p>";
    } else {
        if (isNaN(tempMortYear) == true) {
            errorMsg += "<p><mark>Mortgage year field: </mark>Must be numeric <br />" + mortYearMsg + "</p>";
        } else {
            if (tempMortYear < tempDate || tempMortYear > tempDateNext) {
                errorMsg += "<p><mark>Mortgage year field: </mark>Must be a current year or following one <br />" + mortYearMsg + "</p>";
            }
        }
    }
    return errorMsg;
}

//This function validates month field
function validateMortMonth(errorMsg) {
    var tempMortMonth = document.mortgage.mortMonth.value;
    tempMortMonth = tempMortMonth.trim();
    var tempMortMonthLength = tempMortMonth.length;
    var mortMonthMsg = "Please enter the Month!";
    var tempDateMonth = new Date();
    tempDateMonth = tempDateMonth.getMonth() + 1;
    var tempDateMonthNext = parseInt(tempDateMonth) + 1;

    if (tempMortMonthLength == 0) {
        errorMsg += "<p><mark>Mortgage month field: </mark>Field is empty <br />" + mortMonthMsg + "</p>";
    } else {
        if (isNaN(tempMortMonth) == true) {
            errorMsg += "<p><mark>Mortgage month field: </mark>Must be numeric <br />" + mortMonthMsg + "</p>";
        } else {
            if (tempMortMonth < 1 || tempMortMonth > 12) {
                errorMsg += "<p><mark>Mortgage month field: </mark>Must be 1 to 12 <br />" + mortMonthMsg + "</p>";
            } else {
                if (tempMortMonth < tempDateMonth || tempMortMonth > tempDateMonthNext) {
                    errorMsg += "<p><mark>Mortgage month field: </mark>Must be a current month or following one <br />" + mortMonthMsg + "</p>";
                }
            }
        }
    }
    return errorMsg;
}

//This function validates interest rate field
function validateIntRate(errorMsg) {
    var tempIntRate = document.mortgage.intRate.value;
    tempIntRate = tempIntRate.trim();
    var tempIntRateLength = tempIntRate.length;
    var tempIntRateMsg = "Please enter Interest Rate!";

    if (tempIntRateLength == 0) {
        errorMsg += "<p><mark>Interest rate field: </mark>Field is empty <br />" + tempIntRateMsg + "</p>";
    } else {
        if (isNaN(tempIntRate) == true) {
            errorMsg += "<p><mark>Interest rate field: </mark>Must be numeric <br />" + tempIntRateMsg + "</p>";
        } else {
            if (parseFloat(tempIntRate) < 2.000 || parseFloat(tempIntRate) > 11.000) {
                errorMsg += "<p><mark>Interest rate field: </mark>Must be values: 2.000 thru 11.000 inclusive <br />" + tempIntRateMsg + "</p>";
            } 
        }
    }
    return errorMsg;
}

//This function validates amortization field
function validateAmortization(errorMsg) {
    var tempAmortization = document.mortgage.amortization.value;
    tempAmortization = tempAmortization.trim();
    var tempAmortizationLength = tempAmortization.length;
    var tempAmortizationMsg = "Please enter Amortization!";

    if (tempAmortizationLength == 0) {
        errorMsg += "<p><mark>No. of years field: </mark>Field is empty <br />" + tempAmortizationMsg + "</p>";
    } else {
        if (isNaN(tempAmortization) == true) {
            errorMsg += "<p><mark>No. of years field: </mark>Must be numeric <br />" + tempAmortizationMsg + "</p>";
        } else {
            if (tempAmortization < 5 || tempAmortization > 20) {
                errorMsg += "<p><mark>No. of years field: </mark>Must be values: 5 thru 20 inclusive <br />" + tempAmortizationMsg + "</p>";
            }
        }
    }
    return errorMsg;
}

//This function displays error message
function showErrorMsg(errorMsg) {
    document.getElementById('error').innerHTML = errorMsg;
}

//This function clears error message
function clearErrorMsg(errorMsg) {
    document.getElementById('error').innerHTML = "Error will be displayed here";
}