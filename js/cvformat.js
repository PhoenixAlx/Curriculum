window.onload= loadCVFull;

function loadHeader(nameTitle){
    
  
    var header='<div class="container_16"><hgroup><h1>'+nameTitle+'</h1></hgroup><figure>		<img src="img/perfil.jpg" alt="'+nameTitle+'"></figure></div>'
    
    
    
    $("#header").append(header);
}
function loadLateralMenu(categ){
    
    var list_categ="";
    for (var i=0;i<categ.length;i++){
        list_categ=list_categ+'<li class="pushy-link"><a href="#">'+categ[i]+'</a></li>';
    }
    
    
    $("#submenuCat").append(list_categ);
}
function loadInformation(cv_datas){
    //load sections
    var sections='<section role="main" class="container_16 " >';
    var cate=cv_datas.all_values_uni("id_category");
    var name_cate=cv_datas.all_values_uni("category");
    for (var c=0;c< cate.length;c++){
        var ca=cate[c];
        var section='<div class="grid_16"><div class="grid_16  '+ca+'""><h3>'+name_cate[c]+'</h3>';
        
        for (var i=0;i< cv_datas.datas.length;i++){
            
            if (ca==cv_datas.datas[i].id_category){
                if (cv_datas.datas[i].field!="photoCV"){
                    section=section+'<p><b>'+cv_datas.datas[i].text_field+':</b> <span>'+cv_datas.datas[i].info+'</span></p>';
                }
            }
        }
        section=section+'</div></div>';
        
        sections=sections+section;
    }
    sections=sections+'</section>';
    $("#container").append(sections);
}
function createTreeCategories(cv_datas){
    var section_categories='';
    var categories=[];
    //for in datas
    for (var i=0;i< cv_datas.length;i++){
            var cate=cv_datas[i].category;
            if (cate == cv_datas[i].field){
                categories.push([cv_datas[i].text_field,cv_datas[i].info]);
                section_categories=section_categories+'<section class="uk-section uk-section-primary  uk-column-divider  "><div class="uk-grid-match uk-child-width-1-2@m" uk-grid><h3 >'+cv_datas[i].text_field+'</h3><h2 >'+cv_datas[i].info+'</h2></div></section>'
            }
    }

    $("body").append(section_categories);
}
function loadCVFull(){
    //Load full Curriculum
    var datas_cv= new datasCV();
    // make header
    var cate=datas_cv.all_values_uni("category");
    var nameTitle=datas_cv.value("name");
    loadHeader(nameTitle);
    loadLateralMenu(cate);
    loadInformation(datas_cv);
    createTreeCategories(datas_cv.datas);
} 
