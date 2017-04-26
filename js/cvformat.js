window.onload= init;
function init(){
    loadCVFull('es');
}
function changeLang(lang){
    //on the moment load full CV, in the fure only select category
    loadCVFull(lang);
}
function loadHeader(nameTitle){
    
  
    var header='<div class="container_16"><hgroup><h1>'+nameTitle+'</h1></hgroup><figure>		<img src="img/perfil.jpg" alt="'+nameTitle+'"></figure></div>'
    
    
    
    $("#div_header").html(header);
}
function loadLateralMenuLang(langs){
    
    var list_langs="";
    for (var i=0;i<langs.length;i++){
        list_langs=list_langs+'<li class="pushy-link"><a href="#"><button id="cbox'+langs[i]+'" onclick="changeLang(\''+langs[i]+'\')"><span class="label_menu" >'+langs[i]+'</span></button></a></li>';
    }
    
    $("#submenuLang").html("");
    $("#submenuLang").append(list_langs);
}
function loadLateralMenu(categ){
    
    var list_categ="";
    for (var i=0;i<categ.length;i++){
        list_categ=list_categ+'<li class="pushy-link"><a href="#"><input  type="checkbox" id="cbox'+categ[i]+'" value="'+categ[i]+'"><label class="label_menu" for="cbox'+categ[i]+'">'+categ[i]+'</label></input></a></li>';
    }
    
    $("#submenuCat").html("");
    $("#submenuCat").append(list_categ);
}
function loadInformation(cv_datas){
    //load sections
    var sections='<section role="main" class="container_16 " >';
    var cate=cv_datas.all_values_uni("id_category");
    var name_cate=cv_datas.all_values_uni("category");
    for (var c=0;c< cate.length;c++){
        var ca=cate[c];
        var section='<div class="grid_16"><div id="div_'+ca+'" class="grid_16  '+ca+'""><h3>'+name_cate[c]+'</h3>';
        
        for (var i=0;i< cv_datas.datas.length;i++){
            
            if (ca==cv_datas.datas[i].id_category){
                
                if (cv_datas.datas[i].field!="photoCV"){
                    var info_date="";
                    if (cv_datas.datas[i].date!=""){
                        info_date='('+cv_datas.datas[i].date+')';
                    }
                    section=section+'<p><b>'+cv_datas.datas[i].text_field+' '+info_date+':</b> <span class="cv_data_extra">'+cv_datas.datas[i].info+'</span></p>';
                }
            }
        }
        section=section+'</div></div>';
        
        sections=sections+section;
    }
    sections=sections+'</section>';
    $("#container").html(sections);
    //$("#container").append(sections);
}

function loadCVFull(lang){
    //Load full Curriculum
    var datas_cv= new datasCV(lang);
    // make header
    var cate=datas_cv.all_values_uni("category");
    var nameTitle=datas_cv.value("name");
    var langs=datas_cv.all_langs;
    loadHeader(nameTitle);
    loadLateralMenuLang(langs);
    loadLateralMenu(cate);
    loadInformation(datas_cv);
    //createTreeCategories(datas_cv.datas);
} 
