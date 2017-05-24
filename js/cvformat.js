

class CV{
    constructor(datas_cv){
        this.datas_cv= datas_cv;
        this.loadCVFull(this.datas_cv.lang);
        this.loadMenuLang();
        
    }
    setLang(lang){
       this.datas_cv.lang=lang;
    }
    loadMenuLang(){
        let name_lang={'es':{'es':'español','en':'inglés'},'en':{'es':'spanish','en':'english'}};
        let langs=[];
        for (let i in this.datas_cv.all_langs){
            langs.push(name_lang[this.datas_cv.lang][datas_cv.all_langs[i]])
        }
        let m= new menu("menu_lang");
        m.imgMenu="img/lang.png";
        m.top="80px";
        m.left="10px";
        m.putMenu();
        m.addOptions({"elements":langs});
    }
    loadMenuCategories(){
        let cate=this.datas_cv.all_values_uni("category");
        let m_cat= new menu("menu_categories");
        m_cat.top="10px";
        m_cat.left="10px";
        m_cat.zIndex=11000;
        m_cat.imgMenu="img/category.png";
        m_cat.putMenu();
        m_cat.addOptions({"elements":cate});
        for (let c in cate){
             m_cat.addOptions({"elements":["ver","ocultar"],parent:cate[c]});
        }
    }
    loadInformation(){
        //load sections
        let sections='<section role="main" class="container_16 " >';
        let cate=this.datas_cv.all_values_uni("id_category");
        let name_cate=this.datas_cv.all_values_uni("category");
        for (let c=0;c< cate.length;c++){
            let ca=cate[c];
            let section='<div class="grid_16"><div id="div_'+ca+'" class="grid_16  '+ca+'""><h3>'+name_cate[c]+'</h3>';
            
            for (let i=0;i< this.datas_cv.data.length;i++){
                
                if (ca==this.datas_cv.data[i].id_category){
                    
                    if (this.datas_cv.data[i].field!="photoCV"){
                        let info_date="";
                        if (this.datas_cv.data[i].date!=""){
                            info_date='('+this.datas_cv.data[i].date+')';
                        }
                        section=section+'<p><b>'+this.datas_cv.data[i].text_field+' '+info_date+':</b> <span class="cv_data_extra">'+this.datas_cv.data[i].info+'</span></p>';
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
    loadHeader(){
        let nameTitle=this.datas_cv.value("name");
        let header='<div class="container_16"><hgroup><h1>'+nameTitle+'</h1></hgroup><figure>		<img src="img/perfil.jpg" alt="'+nameTitle+'"></figure></div>'
        $("#div_header").html(header);
    }
    loadCVFull(lang){
        this.setLang(lang);
        this.loadMenuCategories();
        this.loadHeader();
        this.loadInformation();
    } 
}
