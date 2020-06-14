// The purpose of this method is to maximize the PDF of the page, 
// and scroll it towards the top of the screen
function maximizeDafScreen(){
    
    // First set as 'unmaximized'
    $('#hdnMale').val(0);
    $('#cmdMaleh').click();
    
    // Refresh the PDF so it fits the full width
    var src=$('#ContentPlaceHolderMain_ifrPage').attr('src');
    src=src.replace('#','?#')+"&view=FitV";
    
    // Scroll the PDF to the top of the browser
    $('#ContentPlaceHolderMain_ifrPage').attr('src',src);
    $(window).scrollTop(250);
} 

function updateTitle(){
    document.title=$("#ContentPlaceHolderMain_hdrMassechet").text();
    getLinks();
}

function getLinks(){
    var daf=$("#ContentPlaceHolderMain_hdrMassechet").text();
    console.log("https://www.sefaria.org.il/api/links/"+daf);
    $.get("https://www.sefaria.org.il/api/links/"+daf).done(function(data){
       data=data.filter(function(x){
           return x.type=="ein mishpat / ner mitsvah";
        });
    var form= $("#form1");
    var html="<div id='sidebar' ><div id='sidebar-btn'><!--span></span><span></span><span></span--></div><ul>";
    html+="<li style='color:red;font-weight:bold'><a target='_sefaria' href='http://www.sefaria.org.il/"+daf+"?lang=he&with=all&lang2=he'>"+daf+"</a></li>";

  $.each(data,function(i,item){
    console.log(item.ref);
    console.log(item.sourceHeRef);
    console.log("http://www.sefaria.org.il/"+item.sourceHeRef)
    html+="<li><a target='_sefaria' href='http://www.sefaria.org.il/"+item.sourceHeRef+"?lang=he&with=all&lang2=he'>"+item.sourceHeRef+"</a></li>";
  });
  html+="</ul></div>";
  form.append(html);
  $(document).ready(function() {
    $('#sidebar-btn').on('click', function() {
      $('#sidebar').toggleClass('visible');
    });
  });

});
}
// This subscribes to the newly added 'OpenDapim' link to open all 4 pages
$("#OpenDapim").live("click", function(){
    console.log("Open the 4 Amudim");
    var link=$('#oPageLinksBox > a').first() ;
    var url=$(link).attr("href");
    var prefix=url.substring(0,url.lastIndexOf('=')+1);
    var page=parseInt(url.substring(url.lastIndexOf('=')+1));
    window.open(prefix+(page+2),"_blank");
    window.open(prefix+(page+1),"_blank");
    window.open(prefix+page,"_blank");
    window.open(prefix+(page-1),"_blank");
});


// If we are opening up a Daf- we maximize and scroll it by default
if(location.href.indexOf("DafYomi_Page.aspx")>-1){
    console.log("Maximize Daf");
     maximizeDafScreen();
     updateTitle();
}

// If we are on the homepage, we inject a button to launch the 4 amudim
if(location.href.indexOf("dafYomi.aspx")>-1){
    var link=$('#oPageLinksBox > a').last() ;
    var url=$(link).href;
    $(link).append("<br><button class='clsButton' href='#'  id='OpenDapim' >עמוד+4</button> ");
 } 