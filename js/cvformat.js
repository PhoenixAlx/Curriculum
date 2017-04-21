window.onload= loadCVFull;

function loadHeader(categ){
    
    var list_categ="";
    for (var i=0;i<categ.length;i++){
        list_categ=list_categ+'<li class="uk-nav-divider"><a href="#">'+categ[i]+'</a></li>';
    }
    var menu='<ul class="uk-navbar-nav"><li class="uk-active"><a href="#" ><span >Completo<span></a></li><li ><a href="#" >Categorías</a><div class="uk-navbar-dropdown"><ul class="uk-nav uk-navbar-dropdown-nav">'+list_categ+'</ul></div></li></ul>';
    var header='<header ><h1 class="uk-heading-primary uk-position-small uk-position-relative uk-position-top-center ">CURRÍCULUM</h1><nav class="uk-navbar-container" uk-navbar>'+menu+'</nav></header><hr class="uk-divider-icon" />';
    $("body").prepend(header);
}
function createTreeCategories(cv_datas){
    var section_categories='';
    var categories=[];
    //for in datas
    console.log(cv_datas)
    for (var i=0;i< cv_datas.length;i++){
            var cate=cv_datas[i].category;
            console.log(cate)
            if (cate == cv_datas[i].field){
                categories.push([cv_datas[i].text_field,cv_datas[i].info]);
                section_categories=section_categories+'<section class="uk-section uk-section-primary  uk-column-divider  "><div class="uk-grid-match uk-child-width-1-2@m" uk-grid><h3 >'+cv_datas[i].text_field+'</h3><h2 >'+cv_datas[i].info+'</h2></div></section>'
            }
    }
    console.log(section_categories)
    $("body").append(section_categories);
}
function loadCVFull(){
    //Load full Curriculum
    var datas_cv= new datasCV();
    // make header
    var cate=datas_cv.name_categories;
    loadHeader(cate);
    createTreeCategories(datas_cv.datas);
} 
