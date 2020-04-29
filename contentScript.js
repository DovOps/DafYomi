function maximizeDafScreen(){
    console.log(document.getElementById("hdnMale"));
    $('#hdnMale').val(0);
    $('#cmdMaleh').click();

   // fChangeScreen();
    
    var src=$('#ContentPlaceHolderMain_ifrPage').attr('src');
    
    src=src.replace('#','?#')+"&view=FitV";
    
    $('#ContentPlaceHolderMain_ifrPage').attr('src',src);
    $(window).scrollTop(250);
 
} 


$("#OpenDapim").live("click", function(){
    console.log("***** *OPEN DAFIM****");
    var link=$('#oPageLinksBox > a').first() ;
    var url=$(link).attr("href");
    var prefix=url.substring(0,url.lastIndexOf('=')+1);
    var page=parseInt(url.substring(url.lastIndexOf('=')+1));
    console.log(prefix);
    console.log(page);
    console.log(page+1);
    console.log(page-1);
    window.open(prefix+(page+2),"_blank");
    window.open(prefix+(page+1),"_blank");
    window.open(prefix+page,"_blank");
    window.open(prefix+(page-1),"_blank");

});



console.log("My Page - EXTENSION EXECUTING");
if(location.href.indexOf("DafYomi_Page.aspx")>-1){
    console.log("MAximize Daf");
     maximizeDafScreen();
  //  setTimeout(maximizeDafScreen,1500);;
}
if(location.href.indexOf("dafYomi.aspx")>-1){



    var link=$('#oPageLinksBox > a').first() ;
    var url=$(link).href;
    $(link).prepend("<a href='#'  id='OpenDapim' style='color:red;'>**SETUP TODAYS DAF**</a><hr/>");
 } 