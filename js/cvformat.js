window.onload= init;
function init(){
    loadCVFull('es');
}
function changeLang(lang){
    //on the moment load full CV, in the fure only select category
    loadCVFull(lang);
}
function loadHeader(nameTitle){
    
  
    let header='<div class="container_16"><hgroup><h1>'+nameTitle+'</h1></hgroup><figure>		<img src="img/perfil.jpg" alt="'+nameTitle+'"></figure></div>'
    
    
    
    $("#div_header").html(header);
}
function loadLateralMenuLang(langs){
    
    let list_langs="";
    for (let i=0;i<langs.length;i++){
        list_langs=list_langs+'<li class="pushy-link"><a href="#"><button id="cbox'+langs[i]+'" onclick="changeLang(\''+langs[i]+'\')"><span class="label_menu" >'+langs[i]+'</span></button></a></li>';
    }
    
    $("#submenuLang").html("");
    $("#submenuLang").append(list_langs);
}
function loadLateralMenu(categ){
    
    let list_categ="";
    for (let i=0;i<categ.length;i++){
        list_categ=list_categ+'<li class="pushy-link"><a href="#"><input  type="checkbox" id="cbox'+categ[i]+'" value="'+categ[i]+'"><label class="label_menu" for="cbox'+categ[i]+'">'+categ[i]+'</label></input></a></li>';
    }
    
    $("#submenuCat").html("");
    $("#submenuCat").append(list_categ);
}
function loadInformation(cv_datas){
    //load sections
    let sections='<section role="main" class="container_16 " >';
    let cate=cv_datas.all_values_uni("id_category");
    let name_cate=cv_datas.all_values_uni("category");
    for (let c=0;c< cate.length;c++){
        let ca=cate[c];
        let section='<div class="grid_16"><div id="div_'+ca+'" class="grid_16  '+ca+'""><h3>'+name_cate[c]+'</h3>';
        
        for (let i=0;i< cv_datas.datas.length;i++){
            
            if (ca==cv_datas.datas[i].id_category){
                
                if (cv_datas.datas[i].field!="photoCV"){
                    let info_date="";
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
    //let name languages
    let name_lang={'es':'spanish','en':'english'};
    
    //Load full Curriculum
    let datas_cv= new datasCV(lang);
    // make header
    let cate=datas_cv.all_values_uni("category");
    let nameTitle=datas_cv.value("name");
    let langs=[];
    for (let i in datas_cv.all_langs){
        langs.push(name_lang[datas_cv.all_langs[i]])
    }
    let m= new menu("menu_lang");
    m.imgMenu="img/menu.png";
    m.top="10px";
    m.left="10px";
    m.putMenu();
    m.addOptions({"elements":langs});
    let m_cat= new menu("menu_categories");
    m_cat.top="80px";
    m_cat.left="10px";
    m_cat.imgMenu="img/menu.png";
    m_cat.putMenu();
    m_cat.addOptions({"elements":["informacion","experiencia"]});
    
    loadHeader(nameTitle);
    loadLateralMenuLang(langs);
    loadLateralMenu(cate);
    loadInformation(datas_cv);
    //createTreeCategories(datas_cv.datas);
} 
