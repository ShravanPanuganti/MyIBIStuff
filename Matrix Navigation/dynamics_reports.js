// =====================================================================================================================
//                                                 Dynamics Reporting - JavaScript
// ---------------------------------------------------------------------------------------------------------------------

//        Date:    03/30/2018            Created By   : Shravan Panuganti

// ======================================================================================================================
//                                                Constants and Variables
// ----------------------------------------------------------------------------------------------------------------------

var Execute = 0;
var SaveAs = 0;
var WaitTime = 2000;
var ReportLoaded = 0;
var LoadProgress = '';

var userAgent = navigator.userAgent.toString().toLowerCase();
var BrowserName=  '';

var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName  = 'Microsoft Internet Explorer';
var nameOffset,verOffset,ix;

// In Opera, the true version is after "Opera" or after "Version"
if ((verOffset=nAgt.indexOf("Opera"))!=-1)
    browserName = "Opera";

// In MSIE, the true version is after "MSIE" in userAgent
else if ((verOffset=nAgt.indexOf("MSIE"))!=-1)
   browserName = "Microsoft Internet Explorer";
// In Chrome, the true version is after "Chrome"
else if ((verOffset=nAgt.indexOf("Chrome"))!=-1)
   browserName = "Chrome";
// In Safari, the true version is after "Safari" or after "Version"
else if ((verOffset=nAgt.indexOf("Safari"))!=-1)
   browserName = "Safari";
// In Firefox, the true version is after "Firefox"
else if ((verOffset=nAgt.indexOf("Firefox"))!=-1)
    browserName = "Firefox";
// In most other browsers, "name/version" is at the end of userAgent
else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) )
    browserName = nAgt.substring(nameOffset,verOffset);

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

// =======================================================================================================================
//                                                 Functions
// -----------------------------------------------------------------------------------------------------------------------

function RunReport(Title, Path)
{
    $("html, body").animate({ scrollTop: 0 }, "slow");
    var Title = Title.replace(/@_#/g, '\'');

    $('body').append('<div id="AlertDiv" style="position:absolute;left:0px;top:0px;width:100%;height:100%;background-color:rgba(0,0,0,.4);z-index:999;overflow:hidden;"></div>');

    if(browserName == 'Safari')
        $('#AlertDiv').append('<div id="AlertBody" style="text-align: center;width:100%;height:1000px;margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');
    else
        $('#AlertDiv').append('<div id="AlertBody" style="text-align: center;width:100%;height:calc(100% - 50px);margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');

    $('#AlertDiv').append('<span class="popup_report_title_bar" style="position:absolute;top:0px;left:0px;width:100%;height:50px;line-height:45px;"></span>');
    $('.popup_report_title_bar').append('<span class="popup_report_title" style="position:absolute;top:10px;left:10%;width:80%;height:30px;">' + Title + '</span>');
    $('.popup_report_title_bar').append('<input type="button" value="" class="popup_report_close" style="position:absolute;top:10px;right:10px;width:25px;height:25px" onclick="CloseReport();">');

    $("#AlertBody").append('<iframe id="Popup_Report_frame" class="Report_Frame" style="position:absolute;top:0px;left:0px;width:100%;height:100%;">');

    $('#LoadingLabel', parent.document).text('Processing Report ... please wait');
     
    PageLoading();

    $("#Popup_Report_frame").attr('src', Path );

   document.getElementById('Popup_Report_frame').onload= function()
   {
        PageLoaded();
   };

    $('.IBI_PageBg').css({'overflow': 'hidden'});
}

function CloseReport()
{
    $('#AlertDiv').fadeOut("slow", function() { $('#AlertDiv').remove();});
    $('.IBI_PageBg').css({'overflow': 'scroll'});
}

function EditReport(Title, Path)
{
    $("html, body").animate({ scrollTop: 0 }, "slow");
    var Title = Title.replace(/@_#/g, '\'');
    $('body').append('<div id="AlertDiv" style="position:absolute;left:0px;top:0px;width:100%;height:100%;background-color:rgba(0,0,0,.4);z-index:999"></div>');

    if(browserName == 'Safari')
        $('#AlertDiv').append('<div id="AlertBody" style="text-align: center;width:100%;height:1000px;margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');
    else
            $('#AlertDiv').append('<div id="AlertBody" style="text-align: center;width:100%;height:calc(100% - 50px);margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');
    
    $('#AlertDiv').append('<span class="popup_report_title_bar" style="position:absolute;top:0px;left:0px;width:100%;height:50px;line-height:45px;"></span>');
    $('.popup_report_title_bar').append('<input type="button" value="" class="popup_report_close" style="position:absolute;top:10px;right:10px;width:25px;height:25px" onclick="CloseReport();">');
    $('.popup_report_title_bar').append('<span class="popup_report_title" style="position:absolute;top:10px;left:10%;width:80%;height:30px;">' + Title + '</span>');
    $("#AlertBody").append('<iframe id="Popup_Report_frame" class="Report_Frame" style="position:absolute;top:0px;left:0px;width:100%;height:100%;"></iframe>');
    $("#Popup_Report_frame").attr('src', Path );

    $('#LoadingLabel', parent.document).text('Calling InfoAssist API ... please wait');

    PageLoading();

    setTimeout(function()
    {
        PageLoaded();
    },15000);

    $('.IBI_PageBg').css({'overflow': 'hidden'});
}


// not using
/*function ReLayout()
{
    $('#Popup_Report_frame').contents().find('.outer_panel').css({'visibility': 'hidden'});
    $('#Popup_Report_frame').contents().find('.Report_Title_Label').css({'visibility': 'hidden'});
    $('#Popup_Report_frame').contents().find('.Report_Frame').css({'top': '-30px'});
    $('#Popup_Report_frame').contents().find('input[type="checkbox"]').hide();

//    $('.IBI_PageBg').css({'overflow': 'hidden'});
    Execute = Execute + 1;
}
*/
function ShowLoadingWaitWindow()
{
    $('body').append('<div id="LoadingWaitDiv" style="position:absolute;left:0px;top:0px;width:100%;height:100%;background-color:rgba(0,0,0,.4);z-index:999"></div>');

    if(browserName == 'Safari')
        $('#LoadingWaitDiv').append('<div id="LoadingWaitBody" style="text-align: center;width:100%;height:1000px;margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');
    else
        $('#LoadingWaitDiv').append('<div id="LoadingWaitBody" style="text-align: center;width:100%;height:calc(100% - 50px);margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');
    $("#LoadingWaitBody").append('<iframe id="LoadingWaitFrame" class="Report_Frame" style="position:absolute;top:0px;left:0px;width:100%;height:100%;"></iframe>');
    $("#LoadingWaitFrame").attr('src', '/ibi_apps/WFServlet.ibfs?IBFS1_action=RUNFEX&IBFS_path=/WFC/Repository/Common_Objects/loading.htm');
//    $('.IBI_PageBg').css({'overflow': 'hidden'});
}
// not using
/*function PopupReport(Title, Path)
{
    $("html, body").animate({ scrollTop: 0 }, "slow");
    var Title = Title.replace(/@_#/g, '\'');
    $('body').append('<div id="AlertDiv" style="position:absolute;left:0px;top:0px;width:100%;height:100%;background-color:rgba(0,0,0,.4);z-index:999"></div>');

    if(browserName == 'Safari')
        $('#AlertDiv').append('<div id="AlertBody" style="text-align: center;width:100%;height:1000px;margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');
    else
            $('#AlertDiv').append('<div id="AlertBody" style="text-align: center;width:100%;height:calc(100% - 50px);margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');
    $('#AlertDiv').append('<span class="popup_report_title_bar" style="position:absolute;top:0px;left:0px;width:100%;height:50px;line-height:45px;"></span>');
    $('.popup_report_title_bar').append('<input type="button" value="" class="popup_report_close" style="position:absolute;top:10px;right:10px;width:25px;height:25px" onclick="HidePopupReport();">');
    $('.popup_report_title_bar').append('<span class="popup_report_title" style="position:absolute;top:10px;left:10%;width:80%;height:30px;">' + Title + '</span>');
    $("#AlertBody").append('<iframe id="Popup_Report_frame" class="Report_Frame" style="position:absolute;top:0px;left:0px;width:100%;height:100%;"></iframe>');
    $("#Popup_Report_frame").attr('src', Path );

    $('.IBI_PageBg').css({'overflow': 'hidden'});
}

function PopupReport_InfoAssist(Title, Path)
{
    $("html, body").animate({ scrollTop: 0 }, "slow");
    var Title = Title.replace(/@_#/g, '\'');
    $('body').append('<div id="AlertDiv" style="position:absolute;left:0px;top:0px;width:100%;height:100%;background-color:rgba(0,0,0,.4);z-index:999"></div>');

    if(browserName == 'Safari')
        $('#AlertDiv').append('<div id="AlertBody" style="text-align: center;width:100%;height:1000px;margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');
    else
        $('#AlertDiv').append('<div id="AlertBody" style="text-align: center;width:100%;height:calc(100% - 50px);margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');
    $('#AlertDiv').append('<span class="popup_report_title_bar" style="position:absolute;top:0px;left:0px;width:100%;height:50px;line-height:45px;"></span>');
    $('.popup_report_title_bar').append('<input type="button" value="" class="popup_report_close" style="position:absolute;top:10px;right:10px;width:25px;height:25px" onclick="HideInfoAssist();">');
    $('.popup_report_title_bar').append('<span class="popup_report_title" style="position:absolute;top:10px;left:10%;width:80%;height:30px;">' + Title + '</span>');
    $("#AlertBody").append('<iframe id="Popup_Report_frame" class="Report_Frame" style="position:absolute;top:0px;left:0px;width:100%;height:100%;"></iframe>');
    $("#Popup_Report_frame").attr('src', Path );

    $('.IBI_PageBg').css({'overflow': 'hidden'});
}

function HideInfoAssist()
{
    $('#AlertDiv').fadeOut("slow", function() { $('#AlertDiv').remove();});
    $('.IBI_PageBg').css({'overflow': 'scroll'});
    $('#report2').contents().find('#AdvancedOption').click();
}

function HidePopupReport()
{
   //$('#AlertDiv').remove();
    $('#AlertDiv').fadeOut("slow", function() { $('#AlertDiv').remove();});
    $('.IBI_PageBg').css({'overflow': 'scroll'});
    execute(document.getElementById('report2'));
}
*/
// not using
/*function PopupAndExecute(Title, Path, UserAccess, Report_Category)
{
    $("html, body").animate({ scrollTop: 0 }, "slow");
    var Title = Title.replace(/@_#/g, '\'');

    if(Report_Category == 'Current Reports')
    {
        $('body').append('<div id="AlertDiv" style="position:absolute;left:0px;top:0px;width:100%;height:100%;background-color:rgba(0,0,0,.4);z-index:999"></div>');

        if(browserName == 'Safari')
            $('#AlertDiv').append('<div id="AlertBody" style="text-align: center;width:100%;height:1000px;margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');
        else
            $('#AlertDiv').append('<div id="AlertBody" style="text-align: center;width:100%;height:calc(100% - 50px);margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');

        $('#AlertDiv').append('<span class="popup_report_title_bar" style="position:absolute;top:0px;left:0px;width:100%;height:50px;line-height:45px;"></span>');
        $('.popup_report_title_bar').append('<span class="popup_report_title" style="position:absolute;top:10px;left:10%;width:80%;height:30px;">' + Title + '</span>');
        //$('.popup_report_title_bar').append('<input type="button" value="" class="popup_report_close" style="position:absolute;top:10px;right:10px;width:25px;height:25px" onclick="HidePopupReport();">');
        $('.popup_report_title_bar').append('<input type="button" value="" class="popup_report_close" style="position:absolute;top:10px;right:10px;width:25px;height:25px" onclick="HidePopupAndExecute(\'' + UserAccess + '\');">');

        if(UserAccess == 'Basic')
        {
            $("#AlertBody").append('<iframe id="Popup_Report_frame" class="Report_Frame" style="position:absolute;top:0px;left:0px;width:100%;height:100%;" onload="ExecuteSavedReport(\'' + UserAccess + '\', \'' + Report_Category + '\');HideScheduleOptions()">');
            $("#Popup_Report_frame").attr('src', Path );

            ShowLoadingWaitWindow();
        }

        else
        {
            $("#AlertBody").append('<iframe id="Popup_Report_frame" class="Report_Frame" style="position:absolute;top:0px;left:0px;width:100%;height:100%;">');
            ShowLoadingWaitWindow();
            $("#Popup_Report_frame").attr('src', Path );

            document.getElementById('Popup_Report_frame').onload= function()
            {
                $('#LoadingWaitDiv').remove();
            };
        }


    }
    else // if(Report_Category == 'Legacy Reports')
    {
        if(browserName != 'Microsoft Internet Explorer')
            $('body').append('<div id="AlertDiv" style="position:absolute;left:0px;top:0px;width:100%;height:100%;background-color:rgba(0,0,0,.4);z-index:999"></div>');

        if(browserName == 'Safari')
            $('#AlertDiv').append('<div id="AlertBody" style="text-align: center;width:100%;height:1000px;margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');
        else
        {
            if(browserName != 'Microsoft Internet Explorer')
            $('#AlertDiv').append('<div id="AlertBody" style="text-align: center;width:100%;height:calc(100% - 50px);margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');
        }

        if(browserName != 'Microsoft Internet Explorer')
        {
            $('#AlertDiv').append('<span class="popup_report_title_bar" style="position:absolute;top:0px;left:0px;width:100%;height:50px;line-height:45px;"></span>');
            $('.popup_report_title_bar').append('<span class="popup_report_title" style="position:absolute;top:10px;left:10%;width:80%;height:30px;">' + Title + '</span>');
            $('.popup_report_title_bar').append('<input type="button" value="" class="popup_report_close" style="position:absolute;top:10px;right:10px;width:25px;height:25px" onclick="HidePopupReport();">');

            ShowLoadingWaitWindow();
        }

        if(browserName == 'Microsoft Internet Explorer')
        {
            var ReportParameterWindow = window.open(Path, '_blank', 'toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=0px, top=0px, width=10, height=10, visible=none', '');
            var LoadingWindow = window.open('/ibi_apps/WFServlet.ibfs?IBFS1_action=RUNFEX&IBFS_path=/WFC/Repository/SharedObjects/html/loading.htm', '_blank', 'toolbar=no,status=no,menubar=no,scrollbars=no,left=0px, top=0px,resizable=no,fullscreen=1', '');

            LoadProgress = setInterval(function()
            {
                if($('#ReportBuilderLoadedEdit'))
                {
                    var ReportBuilderLoadedEdit = ReportParameterWindow.window.document.getElementById("ReportBuilderLoadedEdit");
                    ReportLoaded = ReportBuilderLoadedEdit.value;

                    if(ReportLoaded == 1)
                    {
                        ReportParameterWindow.RunButton_onclick("RunButton");
                        ReportParameterWindow.close();
                        LoadingWindow.close();
                        $('#LoadingWaitDiv').remove();
                        $('#AlertDiv').remove();
                        clearInterval(LoadProgress);
                    }
                }
            }, WaitTime);
        }
        else
        {
            //$("#AlertBody").append('<iframe id="Popup_Report_frame" name="Popup_Report_frame" class="Report_Frame" style="position:absolute;top:0px;left:0px;width:100%;height:100%;" onload="ExecuteSavedReport(\'' + UserAccess + '\');"></iframe>');
            $("#AlertBody").append('<iframe id="Popup_Report_frame" name="Popup_Report_frame" class="Report_Frame" style="position:absolute;top:0px;left:0px;width:100%;height:100%;" onload="ExecuteSavedReport(\'' + UserAccess + '\', \'' + Report_Category + '\');HideScheduleOptions()">');
            window.open(Path, 'Popup_Report_frame');
        }
        ShowLoadingWaitWindow();
    }
}

function HidePopupAndExecute(UserAccess)
{
    if(UserAccess == 'Basic')
        execute(document.getElementById('report2'));
    else
        $('#report2').contents().find('#AdvancedOption').click();

    $('#AlertDiv').fadeOut("slow", function() { $('#AlertDiv').remove();});
}
*/

function ExecuteSavedReport(UserAccess, Report_Category)
{
    if(Report_Category == 'Current Reports')
    {
        if(UserAccess == 'Basic')
        {
            ReLayout();

            if(browserName == 'Microsoft Internet Explorer' || browserName == 'Firefox')
            {
                if(Execute >= 2)
                {
                    LoadProgress = setInterval(function()
                    {
                        ReportLoaded = $('#Popup_Report_frame').contents().find('#ReportBuilderLoadedEdit').val();

                        if(ReportLoaded == 1)
                        {
                            setTimeout(function()
                            {
                                $('#Popup_Report_frame').contents().find('.Report_Frame').animate({'top': '0px'});
                                $('#Popup_Report_frame').contents().find('#RunButton').click();
                                $('#LoadingWaitDiv').remove();
                                $('.IBI_PageBg').css({'overflow': 'hidden'});
                                Execute  = 0;
                                ReportLoaded = 0;
                                clearInterval(LoadProgress);
                            },1000);
                        }
                    }, WaitTime);
                }
            }

            if(browserName == 'Chrome' ||  browserName == 'Safari')
            {
                if(Execute >= 3)
                {
                    LoadProgress = setInterval(function()
                    {
                        ReportLoaded = $('#Popup_Report_frame').contents().find('#ReportBuilderLoadedEdit').val();

                        if(ReportLoaded == 1)
                        {
                            setTimeout(function()
                            {
                                $('#Popup_Report_frame').contents().find('.Report_Frame').css({'top': '0px'});
                                $('#Popup_Report_frame').contents().find('#RunButton').click();
                                $('#LoadingWaitDiv').remove();
                                $('.IBI_PageBg').css({'overflow': 'hidden'});
                                Execute  = 0;
                                ReportLoaded = 0;
                                clearInterval(LoadProgress);
                            },2000);
                        }
                    }, WaitTime);
                }
            }
        }

        else // if(UserAccess == 'Advanced')
        {
            setTimeout(function()
            {
                    $('#LoadingWaitDiv').remove();
            },2000);

        }
    }
    else // if(Report_Category == 'Legacy Reports')
    {
        if(UserAccess == 'Basic')
        {
            ReLayout();

            if(browserName == 'Microsoft Internet Explorer' || browserName == 'Firefox')
            {
                if(Execute >= 2)
                {
                    setTimeout(function()
                   {
                         $('#Popup_Report_frame').contents().find('#RunButton').click();
                        $('#Popup_Report_frame').contents().find('.Report_Frame').css({'top': '0px'});
                        $('#LoadingWaitDiv').remove();
                        $('#AlertDiv').remove();
//                        $('.IBI_PageBg').css({'overflow': 'hidden'});
                        Execute  = 0;
                    },2000);
                }
            }

            if(browserName == 'Chrome' ||  browserName == 'Safari')
            {
                if(Execute >= 3)
                {
                   setTimeout(function()
                   {
                        $('#Popup_Report_frame').contents().find('#RunButton').click();
                        $('#Popup_Report_frame').contents().find('.Report_Frame').css({'top': '0px'});
                        $('#LoadingWaitDiv').remove();
                        $('#AlertDiv').remove();
//                    $('.IBI_PageBg').css({'overflow': 'hidden'});
                        Execute  = 0;
                    },6000);
                }
            }
        }

        else
        {
            setTimeout(function()
            {
                    $('#LoadingWaitDiv').remove();
//                    $('.IBI_PageBg').css({'overflow': 'scroll'});
            },2000);
        }
    }
}

function PopupAndSchedule(Title, Path, Format, Report_Category)
{
    $("html, body").animate({ scrollTop: 0 }, "slow");
    if(Report_Category == 'Current Reports')
    {
        $('body').append('<div id="AlertDiv" style="position:absolute;left:0px;top:0px;width:100%;height:100%;background-color:rgba(0,0,0,.4);z-index:999"></div>');

        if(browserName == 'Safari')
            $('#AlertDiv').append('<div id="AlertBody" style="text-align: center;width:100%;height:1000px;margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');
        else
            $('#AlertDiv').append('<div id="AlertBody" style="text-align: center;width:100%;height:calc(100% - 50px);margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');

        $('#AlertDiv').append('<span class="popup_report_title_bar" style="position:absolute;top:0px;left:0px;width:100%;height:50px;line-height:45px;"></span>');
        $('.popup_report_title_bar').append('<input type="button" value="" class="popup_report_close" style="position:absolute;top:10px;right:10px;width:25px;height:25px" onclick="HideScheduling();">');
        $("#AlertBody").append('<iframe id="Popup_Report_frame" class="Report_Frame" style="position:absolute;top:0px;left:0px;width:100%;height:100%;" onload="ScheduleSavedReport(\'' + Format + '\', \'' + Report_Category + '\');"></iframe>');

        $("#Popup_Report_frame").attr('src', Path );

        ShowLoadingWaitWindow();
    }
    else // if(Report_Category == 'Legacy Reports')
    {
     /*   $('body').append('<div id="AlertDiv" style="position:absolute;left:0px;top:0px;width:100%;height:100%;background-color:rgba(0,0,0,.4);z-index:999"></div>');

        if(browserName == 'Safari')
            $('#AlertDiv').append('<div id="AlertBody" style="text-align: center;width:100%;height:1000px;margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');
        else
            $('#AlertDiv').append('<div id="AlertBody" style="text-align: center;width:100%;height:calc(100% - 50px);margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');

        $('#AlertDiv').append('<span class="popup_report_title_bar" style="position:absolute;top:0px;left:0px;width:100%;height:50px;line-height:45px;"></span>');
        $('.popup_report_title_bar').append('<span class="popup_report_title" style="position:absolute;top:10px;left:10%;width:80%;height:30px;">' + Title + '</span>');
        $('.popup_report_title_bar').append('<input type="button" value="" class="popup_report_close" style="position:absolute;top:10px;right:10px;width:25px;height:25px" onclick="HidePopupReport();">');*/

         if(browserName != 'Microsoft Internet Explorer')
            $('body').append('<div id="AlertDiv" style="position:absolute;left:0px;top:0px;width:100%;height:100%;background-color:rgba(0,0,0,.4);z-index:999"></div>');

        if(browserName == 'Safari')
            $('#AlertDiv').append('<div id="AlertBody" style="text-align: center;width:100%;height:1000px;margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');
        else
        {
            if(browserName != 'Microsoft Internet Explorer')
            $('#AlertDiv').append('<div id="AlertBody" style="text-align: center;width:100%;height:calc(100% - 50px);margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');
        }

        if(browserName != 'Microsoft Internet Explorer')
        {
            $('#AlertDiv').append('<span class="popup_report_title_bar" style="position:absolute;top:0px;left:0px;width:100%;height:50px;line-height:45px;"></span>');
            $('.popup_report_title_bar').append('<span class="popup_report_title" style="position:absolute;top:10px;left:10%;width:80%;height:30px;">' + Title + '</span>');
            $('.popup_report_title_bar').append('<input type="button" value="" class="popup_report_close" style="position:absolute;top:10px;right:10px;width:25px;height:25px" onclick="HidePopupReport();">');

            ShowLoadingWaitWindow();
        }


        if(browserName == 'Microsoft Internet Explorer')
        {

            var ReportParameterWindow = window.open(Path, '_blank', 'toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=0px, top=0px, width=10, height=10, visible=none', '');
            var LoadingWindow = window.open('/ibi_apps/WFServlet.ibfs?IBFS1_action=RUNFEX&IBFS_path=/WFC/Repository/SharedObjects/html/loading.htm', '_blank', 'toolbar=no,status=no,menubar=no,scrollbars=no,left=0px, top=0px,resizable=no,fullscreen=1', '');
            //var AlertWindow = window.open(Path);
  //          setTimeout(function()
    //        {
      //          AlertWindow.RunButton_onclick("ScheduleButton");
        //        AlertWindow.close();
          //     $('#LoadingWaitDiv').remove();
            //    $('#AlertDiv').remove();
            //}, 6000);

            LoadProgress = setInterval(function()
            {
                if($('#ReportBuilderLoadedEdit'))
                {
                    var ReportBuilderLoadedEdit = ReportParameterWindow.window.document.getElementById("ReportBuilderLoadedEdit");
                    ReportLoaded = ReportBuilderLoadedEdit.value;

                    if(ReportLoaded == 1)
                    {
                        ReportParameterWindow.ScheduleButton_onclick("ScheduleButton");
                        ReportParameterWindow.close();
                        LoadingWindow.close();
                        $('#LoadingWaitDiv').remove();
                        $('#AlertDiv').remove();
                        clearInterval(LoadProgress);
                    }
                }
            }, WaitTime);
        }
        else
        {
            $("#AlertBody").append('<iframe id="Popup_Report_frame" name="Popup_Report_frame" class="Report_Frame" style="position:absolute;top:0px;left:0px;width:100%;height:100%;" onload="ScheduleSavedReport(\'' + Format + '\', \'' + Report_Category + '\');">');
            window.open(Path, 'Popup_Report_frame');
        }
        ShowLoadingWaitWindow();
    }
}

function HideScheduling()
{
    $('#AlertDiv').fadeOut("slow", function() { $('#AlertDiv').remove();});
    $('.IBI_PageBg').css({'overflow': 'scroll'});
    //execute(document.getElementById('report2'));
    //$('#report2').contents().find('#AdvancedOption').click();
}

function ScheduleSavedReport(Format, Report_Category)
{
    if(Report_Category == 'Current Reports')
    {
        ReLayout();

        if(browserName == 'Microsoft Internet Explorer' || browserName == 'Firefox')
        {
            if(Execute >= 2)
            {
                LoadProgress = setInterval(function()
                {
                    ReportLoaded = $('#Popup_Report_frame').contents().find('#ReportBuilderLoadedEdit').val();

                    if(ReportLoaded == 1)
                    {
                        setTimeout(function()
                        {
                             if(Format == 'Email')
                                $('#Popup_Report_frame').contents().find('#ScheduleEmailButton').click();
                            else
                                $('#Popup_Report_frame').contents().find('#ScheduleFTPButton').click();

                            $('#LoadingWaitDiv').remove();
                            $('#AlertDiv').remove();
                           // $('.IBI_PageBg').css({'overflow': 'hidden'});
                            Execute  = 0;
                            ReportLoaded = 0;
                            clearInterval(LoadProgress);
                        },2000);
                    }
                }, WaitTime);
            }
        }

        if(browserName == 'Chrome' ||  browserName == 'Safari')
        {
            if(Execute >= 3)
            {
                LoadProgress = setInterval(function()
                {
                    ReportLoaded = $('#Popup_Report_frame').contents().find('#ReportBuilderLoadedEdit').val();

                    if(ReportLoaded == 1)
                    {
                        setTimeout(function()
                        {
                             if(Format == 'Email')
                                $('#Popup_Report_frame').contents().find('#ScheduleEmailButton').click();
                             else
                                $('#Popup_Report_frame').contents().find('#ScheduleFTPButton').click();

                            $('#LoadingWaitDiv').remove();
                            $('#AlertDiv').remove();
                            Execute  = 0;
                            ReportLoaded = 0;

                            clearInterval(LoadProgress);
                       },2000);
                    }
                }, WaitTime);
            }
        }
    }
    else //if(Report_Category == 'Legacy Reports')
    {
        ReLayout();
        if(browserName == 'Firefox')
        {
            if(Execute >= 2)
            {
                setTimeout(function()
                {
                        $('#Popup_Report_frame').contents().find('#ScheduleButton').click();
                        $('#LoadingWaitDiv').fadeOut("slow", function() { $('#LoadingWaitDiv').remove();});
                        $('#AlertDiv').fadeOut("slow", function() { $('#AlertDiv').remove();});
                        Execute  = 0;
                },3000);
            }


        }

        if(browserName == 'Chrome' ||  browserName == 'Safari')
        {
            if(Execute >= 3)
            {
               setTimeout(function()
               {
                        $('#Popup_Report_frame').contents().find('#ScheduleButton').click();
                        $('#LoadingWaitDiv').fadeOut("slow", function() { $('#LoadingWaitDiv').remove();});
                        $('#AlertDiv').fadeOut("slow", function() { $('#AlertDiv').remove();});
                        Execute  = 0;
                },4000);
            }
        }
    }
}

function ScheduleOptions(Title, Path, Report_Category, UserAccess)
{
    $('body').append('<div id="ScheduleOptionsDiv" style="position:absolute;left:calc(50% - 200px);top:calc(50% - 100px);width:300px;height:120px;background-color:rgba(0,0,0,.4);z-index:999"></div>');
    $('#ScheduleOptionsDiv').append('<div id="ScheduleOptionsBody" style="text-align: center;width:calc(100% - 2px);height:calc(100% - 50px);margin-left: auto;margin-right: auto;top:50px;" class="dialog_box"></span><br><br><br></div>');
    $('#ScheduleOptionsDiv').append('<span class="dialog_box_title" style="position:absolute;top:0px;left:0px;width:100%;height:50px;line-height:45px;"></span>');
    $('#ScheduleOptionsBody').append('<input type="button" value="Email" class="dialog_button" style="position:absolute;top:20px;left:20px;width:120Px;height:30px" onclick="PopupAndSchedule(\'' + Title + '\', \'' + Path + '\', ' + '\'Email\', ' + '\'Current Reports\'' + ');HideScheduleOptions(\'' + UserAccess + '\')">');
    $('#ScheduleOptionsBody').append('<input type="button" value="FTP" class="dialog_button" style="position:absolute;top:20px;left:160px;width:120Px;height:30px" onclick="PopupAndSchedule(\'' + Title + '\', \'' + Path + '\', ' + '\'FTP\', ' + '\'Current Reports\'' + ');HideScheduleOptions(\'' + UserAccess + '\')">');
    $('.dialog_box_title').append('<span class="popup_report_title" style="position:absolute;top:10px;left:10%;width:80%;height:30px;line-height:30px;">Distribution Method</span>');
    $('.dialog_box_title').append('<input type="button" value="" class="popup_report_close" style="position:absolute;top:10px;right:10px;width:25px;height:25px" onclick="HideScheduleOptions(\'' + UserAccess + '\');">');
    $('.TabbedFrame').css({'filter': 'alpha(opacity=10)', 'opacity': '0.1'});
    $('.IBI_pageHeader').css({'filter': 'alpha(opacity=10)', 'opacity': '0.1'});
 }

function ScheduleOptions_Advanced(Title, ObjectDesc, User, Path, UserAccess)
{
   $('body').append('<div id="ScheduleOptionsDiv" style="position:absolute;left:calc(50% - 200px);top:calc(50% - 100px);width:300px;height:120px;background-color:rgba(0,0,0,.4);z-index:999"></div>');
    $('#ScheduleOptionsDiv').append('<div id="ScheduleOptionsBody" style="text-align: center;width:calc(100% - 2px);height:calc(100% - 50px);margin-left: auto;margin-right: auto;top:50px;" class="dialog_box"></span><br><br><br></div>');
    $('#ScheduleOptionsDiv').append('<span class="dialog_box_title" style="position:absolute;top:0px;left:0px;width:100%;height:50px;line-height:45px;"></span>');
    $('#ScheduleOptionsBody').append('<input type="button" value="Email" class="dialog_button" style="position:absolute;top:20px;left:20px;width:120Px;height:30px" onclick="PopupAndSchedule_Advanced(\'' + Title + '\', \'' + Path + '\', \'' + ObjectDesc+ '\', \'' + User+ '\', ' + '\'Email\'' + ');HideScheduleOptions(\'' + UserAccess + '\')">');
    $('#ScheduleOptionsBody').append('<input type="button" value="FTP" class="dialog_button" style="position:absolute;top:20px;left:160px;width:120Px;height:30px" onclick="PopupAndSchedule_Advanced(\'' + Title + '\', \'' + Path + '\', \'' + ObjectDesc+ '\', \'' + User+ '\', ' + '\'FTP\'' + ');HideScheduleOptions(\'' + UserAccess + '\')">');
    $('.dialog_box_title').append('<span class="popup_report_title" style="position:absolute;top:0px;left:10%;width:80%;height:50px;line-height:50px;">Distribution Method</span>');
    $('.dialog_box_title').append('<input type="button" value="" class="popup_report_close" style="position:absolute;top:10px;right:10px;width:25px;height:25px" onclick="HideScheduleOptions(\'' + UserAccess + '\');">')
    $('.TabbedFrame').css({'filter': 'alpha(opacity=10)', 'opacity': '0.1'});
    $('.IBI_pageHeader').css({'filter': 'alpha(opacity=10)', 'opacity': '0.1'});
 }

function PopupAndSchedule_Advanced(Title, Path, ObjectDesc, User, Format)
{

$('.IBI_PageBg').css({'overflow': 'hidden'});

    var Title = Title.replace(/@_#/g, '\'');

    $('body').append('<div id="AlertDiv" class="alert_div"></div>');

    if(browserName == 'Safari')
        $('#AlertDiv').append('<div id="AlertBody" style="text-align: center;width:100%;height:1000px;margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');
    else
        $('#AlertDiv').append('<div id="AlertBody" style="text-align: center;width:100%;height:calc(100% - 50px);margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');

    $('#AlertDiv').append('<span class="popup_report_title_bar"></span>');
    $('.popup_report_title_bar').append('<input type="button" value="" class="popup_report_close" style="position:absolute;top:10px;right:10px;width:25px;height:25px" onclick="HideAdvancedScheduling(this);">');


    $('.popup_report_title_bar').append('<span class="popup_report_title" style="position:absolute;top:0px;left:10%;width:80%;height:30px;">' + Title + ' - Scheduling</span>');
    $("#AlertBody").append('<iframe id="Popup_Report_frame" class="Report_Frame" style="position:absolute;top:0px;left:0px;width:100%;height:100%;"></iframe>');

    var FolderName= Path.replace("/ibi_apps/WFServlet.ibfs?IBFS1_action=RUNFEX&IBFS_path=/WFC/Repository/", "");
    FolderName = FolderName.replace(".fex", "");
    var n = FolderName.indexOf("&IBIMR");
    FolderName = FolderName.substr(0, n);

    var RandNum = Math.floor(Math.random()*100000+1);

    var LastDelimiter = FolderName.lastIndexOf("/") + 1;

    var FileName = FolderName.substr(LastDelimiter, FolderName.length);

    var FileOrigName = FileName ;

    FileName = FileName + "_" + RandNum;
    ObjectDesc  = ObjectDesc + "_" + RandNum;

    FolderName = FolderName.substr(0, LastDelimiter-1);

    var Schedule_URL = '/ibi_apps/WFServlet.ibfs?IBFS1_action=RUNFEX&IBFS_path=/WFC/Repository/CustomReports/SavedReports/custom_scheduling_wizard.htm&FolderName=' + FolderName + '&FileName=' + FileName + '&SchTitle=' + ObjectDesc + '&renwO=' + User + '&FileOrigName=' + FileOrigName + '&DistFormat=' + Format +'&ICD9=';

    $("#Popup_Report_frame").attr('src', Schedule_URL);
}

function HideAdvancedScheduling(ctrl)
{
    $('#AlertDiv').fadeOut("slow", function() { $('#AlertDiv').remove();});
    $('.IBI_PageBg').css({'overflow': 'scroll'});
    //execute(document.getElementById('report2'));
    $('#report2').contents().find('#AdvancedOption').click();
}

function ScheduleSavedReport_Advanced()
{
    var Schedule_URL = 'https://' + $(location).attr('hostname');

    Schedule_URL = Schedule_URL + "/ibi_apps/rs/ibfs/WFC/Repository/Public/REST_test_Schedule_10182016.sch?IBIRS_action=put&IBIRS_replace=false&IBIRS_object="

    var IBIRS_object = "";

    var rootObject = "<rootObject _jt='IBFSCasterObject' description='Schedule Created through REST - 10182016' type='CasterSchedule'>";
    var casterObject = "<casterObject _jt='CasterSchedule' active='true' deleteJobAfterRun='false' description='Schedule Created through REST - 10182016' owner='dqaaibi1' priority='3' traceType='0'>";

    var notification  = "<notification _jt='CasterScheduleNotification' addressForBriefNotification='shravan.panuganti@coxautoinc.com' addressForFullNotification='shravan.panuganti@coxautoinc.com' description='' from='' subject='' type='INACTIVE'/>";

    var distributionList = "<distributionList _jt='array' itemsClass='CasterScheduleDistribution' size='1'><item _jt='CasterScheduleDistributionEmail' authEnabled='False' authPassword='' authUserId='' description='Email' enabled='true' index='0' inlineMessage='Please check or not' inlineTaskIndex='0' mailFrom='shravan.panuganti@coxautoinc.com' mailReplyAddress='shravan.panuganti@coxautoinc.com' mailServerName='172.31.8.176' mailSubject='You have got mail' sendingReportAsAttachment='True' sslEnabled='True' tlsEnabled='False' zipFileName='' zipResult='False'>";
    distributionList = distributionList  + "<destination _jt='CasterScheduleDestination' distributionFile='' distributionListFullPath='' singleAddress='shravan.panuganti@coxautoinc.com' type='SINGLE_ADDRESS'>";
    distributionList = distributionList  + "<dynamicAddress _jt='CasterScheduleDynamicAddress' password='' procedureName='' serverName='' userName=''/>";
    distributionList = distributionList  + "</destination></item></distributionList>";

    var timeInfoList = "<timeInfoList _jt='array' itemsClass='CasterScheduleTimeInfo' size='1'><item class='ibi.broker.api.data.schedule.TimeInfoOnce' description='' enabled='true' index='0' name=''>";
    timeInfoList = timeInfoList + "<startTime _jt='calendar' time='1355756400000'/></item></timeInfoList>";

    var taskList  = "<taskList _jt='array' itemsClass='CasterScheduleTask' size='1'>";
    taskList = taskList  + "<item alertEnabled='false' burst='true' class='ibi.broker.api.data.schedule.TaskStandardReport' description='Task 1' domainHREF='' enabled='true' execId='guest' execPassword='guest' firstPostProcessingProcedure='' firstPreProcessingProcedure='' index='0' procedureDescription='' procedureName='IBFS:/WFC/Repository/Public/Down_Payment_by_Company_333.fex' reportName='Down_Payment_by_Company_333.htm' secondPostProcessingProcedure='' secondPreProcessingProcedure='' sendFormat='HTML' serverName='EDASERVE'>";

    IBIRS_object = rootObject + casterObject + notification + distributionList + timeInfoList + taskList;

    var EndTags = "</casterObject></rootObject>";

    IBIRS_object = IBIRS_object + EndTags;

    Schedule_URL = Schedule_URL + IBIRS_object;

    $("#Popup_Report_frame").attr('src', Schedule_URL);

    setTimeout(function()
    {
        $('#LoadingWaitDiv').remove();
//        $('.IBI_PageBg').css({'overflow': 'scroll'});
    },2000);
}

function HideScheduleOptions(UserAccess)
{
//    $('#ScheduleOptionsDiv').remove();
    $('#ScheduleOptionsDiv').fadeOut("slow", function() { $('#ScheduleOptionsDiv').remove();});
    $('.TabbedFrame').animate({'filter': 'alpha(opacity=100)', 'opacity': '1'});
    $('.IBI_pageHeader').animate({'filter': 'alpha(opacity=100)', 'opacity': '1'});

    //execute(document.getElementById('report2'));
    if(UserAccess == 'Basic')
        execute(document.getElementById('report2'));
    else
        $('#report2').contents().find('#AdvancedOption').click();
}

function DeleteSavedReport(Path, UserAccess)
{
    $('body').append('<div id="DeleteDiv" style="position:absolute;left:0px;top:0px;width:100%;height:100%;background-color:rgba(0,0,0,.4);z-index:999;visibility:hidden"></div>');

    if(browserName == 'Safari')
        $('#DeleteDiv').append('<div id="DeleteBody" style="text-align: center;width:100%;height:1000px;margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');
    else
        $('#DeleteDiv').append('<div id="DeleteBody" style="text-align: center;width:100%;height:calc(100% - 50px);margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');
    $('#DeleteDiv').append('<span class="popup_report_title_bar" style="position:absolute;top:0px;left:0px;width:100%;height:50px;line-height:45px;"></span>');
    $('.popup_report_title_bar').append('<input type="button" value="" class="popup_report_close" style="position:absolute;top:10px;right:10px;width:25px;height:25px" onclick="HidePopupReport();">');
    $("#DeleteBody").append('<iframe id="Delete_frame" class="Report_Frame" style="position:absolute;top:0px;left:0px;width:100%;height:100%;"></iframe>');

    $("#Delete_frame").attr('src', Path );

    setTimeout(function()
    {
        $('#DeleteDiv').remove();
        $('.TabbedFrame').contents().find('#' + UserAccess).click();
    },1000);
}

function DeleteAlert(Title, Path, UserAccess)
{
    $('html, body').animate({
        scrollTop: 0
     }, 700);
    var Title = Title.replace(/@_#/g, '\'');
    $('.IBI_PageBg').css({'overflow': 'hidden'});

    var HeadingClass = "";
    HeadingClass = "alertbox_warning";
    $('body').first().append('<div id="AlertDiv" style="position:absolute;left:0px;top:0px;width:100%;height:100%;background-color:rgba(0,0,0,.4);z-index:999"></div>');
    $('table').first().fadeTo("slow",.2);
    $('#AlertDiv').append('<div id="AlertBody" style="text-align: center;width:400px;height:175px;margin-left: auto;margin-right: auto;top:calc(50% - 75px);" class="alertbox"></span><br><br><br></div>');
    $('#AlertBody').append('<span class="' + HeadingClass + '" style="position:absolute;top:0px;left:0px;width:20%;height:100%;line-height:45px;"></span>');
    $('#AlertBody').append('<span class="alertbox_title" style="position:absolute;top:20px;left:20%;width:80%;height:30px;">Delete File?</span>');
    $('#AlertBody').append('<span class="alertbox_message" style="position:absolute;top:60px;left:20%;width:80%;height:calc(100% - 60px);">Are you sure you want to delete <B>' +  Title + '?</B></span>');
    $('#AlertBody').append('<input type="button" value="Yes" class="dialog_button" style="position:absolute;bottom:20px;left:120px;width:100px;height:35px" onclick="DeleteSavedReport(\'' + Path + '\', \'' + UserAccess + '\'); HideDeleteAlert();">');
    $('#AlertBody').append('<input type="button" value="No" class="dialog_button" style="position:absolute;bottom:20px;left:260px;width:100px;height:35px" onclick="HideDeleteAlert();">');
 }

function HideDeleteAlert()
{
    $('#AlertDiv').remove();
    $('.IBI_PageBg').css({'overflow': 'scroll'});
    $('table').first().fadeTo( "slow", 1 );
}

function ViewReportCode(Title, Path, UserAccess)
{
    var Title = Title.replace(/@_#/g, '\'');
    var TrimmedTitle = Title.trim();

    $('body').append('<div id="CodeDiv" class="alert_div"></div>');

    if(browserName == 'Safari')
        $('#CodeDiv').append('<div id="CodeBody" style="text-align: center;width:100%;height:1000px;margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');
    else
        $('#CodeDiv').append('<div id="CodeBody" style="text-align: center;width:100%;height:calc(100% - 50px);margin-left: auto;margin-right: auto;top:50px;" class="alertbox"></span><br><br><br></div>');

    $('#CodeDiv').append('<span class="popup_report_title_bar" style="position:absolute;top:0px;left:0px;width:100%;height:50px;line-height:45px;"></span>');
    //$('.popup_report_title_bar').append('<span class="popup_report_title" style="position:absolute;top:0px;left:10%;width:80%;height:50px;line-height:50px;"><input id="TitleText" type="text" class="popup_report_title_text" style="position:absolute;top:0px;left:10%;width:80%;line-height:50px;" value="' + Title + '"></span>');
    $('.popup_report_title_bar').append('<span class="popup_report_title" style="position:absolute;top:0px;left:10%;width:80%;height:50px;line-height:50px;"><input id="TitleText" type="text" class="popup_report_title_text" style="position:absolute;top:0px;left:10%;width:80%;line-height:50px;" value="' + TrimmedTitle + '"></span>');
    $('.popup_report_title_bar').append('<input type="button" value="" class="popup_report_close" style="position:absolute;top:13px;right:10px;width:25px;height:25px" onclick="HideCodeDiv();">');
    $("#CodeBody").append('<iframe id="Encoded_frame" name="Encoded_frame" class="Report_Frame" style="position:absolute;top:0px;left:0px;width:1px;height:1px;visibility:hidden;"></iframe>');
    $("#CodeBody").append('<form id="Code_Form" target="New_frame" style="position:absolute;top:0px;left:0px;width:1px;height:1px;visibility:hidden;" method="post"></form>');
    $("#Code_Form").append('<iframe id="New_frame" name="New_frame" class="Report_Frame" style="position:absolute;top:0px;left:0px;width:1px;height:1px;visibility:hidden;"></iframe>');
    $("#Code_Form").append('<textarea id="IBIRS_object" name="IBIRS_object" class="textarea"style="position:absolute;top:20px;left:20px;width:10px;height:10px;"></textarea>');
    $("#CodeBody").append('<textarea id="Code_Box" class="textarea"style="position:absolute;top:20px;left:20px;width:calc(100% - 40px);height:calc(100% - 40px);"></textarea>');
    //$('.popup_report_title_bar').append('<input id="SaveAsButton" type="button" value="Save As" class="title_bar_button" style="position:absolute;top:10px;right:45px;width:80Px;height:30px" onclick="SaveAsReport(\'' + Title + '\', \'' + Path + '\');" >');
    $('.popup_report_title_bar').append('<input id="SaveAsButton" type="button" value="Save As" class="title_bar_button" style="position:absolute;top:10px;right:45px;width:80Px;height:30px" onclick="SaveAsReport(\'' + TrimmedTitle + '\', \'' + Path + '\');" >');
    //$('.IBI_PageBg').css({'overflow': 'hidden'});

    $("#Encoded_frame").attr('src', Path );

    setTimeout(function()
    {
        var Decoded_Code = '';
        var Encoded_Code = '';

        if(browserName == 'Microsoft Internet Explorer')
        {
            Encoded_Code = $('#Encoded_frame').contents().find('content').prop("textContent");
            Decoded_Code = Base64.decode(Encoded_Code);
            $('#Code_Box').val(Decoded_Code);
        }
        else // if(browserName != 'Microsoft Internet Explorer')
        {
            Decoded_Code = atob($('#Encoded_frame').contents().find('content').html());
            $('#Code_Box').val(Decoded_Code);
        }

        $('.popup_report_title_bar').append('<input id="SaveAsButton" type="button" value="Save As" class="title_bar_button" style="position:absolute;top:10px;right:45px;width:80Px;height:30px" onclick="SaveAsReport(\'' + Title + '\', \'' + Path + '\');" >');
    },1000);
}

function HideCodeDiv()
{
    $('#CodeDiv').fadeOut("slow", function() { $('#CodeDiv').remove();});
    $('table').first().fadeTo( "slow", 1 );
    $('.IBI_PageBg').css({'overflow': 'scroll'});
}

function CodeAlert(Title, Path, UserAccess)
{
    var HeadingClass = "";
    HeadingClass = "alertbox_warning";
    $('body').first().append('<div id="AlertDiv" style="position:absolute;left:0px;top:0px;width:100%;height:100%;background-color:rgba(0,0,0,.4);z-index:999"></div>');
    $('table').first().fadeTo("slow",.2);
    $('#AlertDiv').append('<div id="AlertBody" style="text-align: center;width:400px;height:175px;margin-left: auto;margin-right: auto;top:calc(50% - 75px);" class="alertbox"></span><br><br><br></div>');
    $('#AlertBody').append('<span class="' + HeadingClass + '" style="position:absolute;top:0px;left:0px;width:20%;height:100%;line-height:45px;"></span>');
    $('#AlertBody').append('<span class="alertbox_title" style="position:absolute;top:20px;left:20%;width:80%;height:30px;">Code File?</span>');
    $('#AlertBody').append('<span class="alertbox_message" style="position:absolute;top:60px;left:20%;width:80%;height:calc(100% - 60px);">Are you sure you want to Code <B>' +  Title + '?</B></span>');
    $('#AlertBody').append('<input type="button" value="Yes" class="dialog_button" style="position:absolute;bottom:20px;left:120px;width:100px;height:35px" onclick="ViewReportCode(\'' + Path + '\', \'' + UserAccess + '\'); HideCodeAlert();">');
    $('#AlertBody').append('<input type="button" value="No" class="dialog_button" style="position:absolute;bottom:20px;left:260px;width:100px;height:35px" onclick="HideCodeAlert();">');
 }

function HideCodeAlert()
{
    $('#AlertDiv').remove();
    $('table').first().fadeTo( "slow", 1 );
}

function SaveAsReport(Title, Path)
{
    var SlashLastIndex = 0;
    SlashLastIndex = Path.lastIndexOf("/");

    var PathWithNoFex = Path.substr(0, SlashLastIndex + 1);

    PathWithNoFex =  'https://' + $(location).attr('hostname') + PathWithNoFex;

     var PathWithFex = "";
    var NewReportName = "";
    var SaveURL = "";
    var NewReportDescription = "";
    var Decoded_Code = $('#Code_Box').val();
    var Encoded_Code = '';
    var IBIRS_object = '<rootObject _jt="IBFSMRObject" description="';

    if(browserName == 'Microsoft Internet Explorer')
        Encoded_Code = Base64.encode(Decoded_Code);
    else
        Encoded_Code = btoa(Decoded_Code);

    if(SaveAs < 1)
    {
        $('#TitleText').removeClass("popup_report_title_text");
        $('#TitleText').focus();
        $('#TitleText').addClass("popup_report_title_text_onfocus");
        $('#Code_Box').addClass('background_dull');
        $('.title_bar_button').val("Save");
        $('.title_bar_button').removeClass("title_bar_button").addClass("button");

        SaveAs = 1;
    }
    else
    {
        SaveAs = 0;
        NewReportName  = $('#TitleText').val();
        NewReportDescription  = NewReportName ;
        NewReportName  = NewReportName.replace(/ /g, "_") + '.fex';

        PathWithFex  = PathWithNoFex + NewReportName;

        //SaveURL = PathWithFex  + '?IBIRS_action=put&IBIRS_object=<rootObject _jt="IBFSMRObject" description="' + NewReportDescription  + '" type="FexFile"><content _jt="IBFSByteContent" char_set="Cp1252">';
        //SaveURL = PathWithFex  + '?IBIRS_action=TEST&IBIRS_object=<rootObject _jt="IBFSMRObject" description="' + NewReportDescription  + '" type="FexFile"><content _jt="IBFSByteContent" char_set="Cp1252">';
        SaveURL = PathWithFex  + '?IBIRS_action=put';

        //SaveURL = SaveURL + Encoded_Code + '</content></rootObject>';

        //alert(SaveURL.length); // if more than 7326-chrome / 7452-ie characters, this is failing

        IBIRS_object = IBIRS_object + NewReportDescription  + '" type="FexFile"><content _jt="IBFSByteContent" char_set="Cp1252">';
        IBIRS_object = IBIRS_object + Encoded_Code + '</content></rootObject>';
        $('#IBIRS_object').val(IBIRS_object);

        $('#Code_Form').attr('action', SaveURL );
        $('#Code_Form').submit();
//        $("#Encoded_frame").attr('src', SaveURL);

        HideCodeDiv();

        setTimeout(function()
        {
            $('#report2').contents().find('#AdvancedOption').click();
        },1500);
    }
}
