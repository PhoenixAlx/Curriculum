

class CV{
    constructor(datas_cv){
        this.name_lang={'es':{'es':'español','en':'inglés'},'en':{'es':'spanish','en':'english'}};
        this.menus={};
        this.datas_cv= datas_cv;
        this.loadCVFull(this.datas_cv.lang);
        this.loadMenuLang();
        this.addEventLang();
        
    }
    setLang(lang){
       this.datas_cv.lang=lang;
    }
    addEventLang(){
        for (let i in this.datas_cv.all_langs){
            let l=this.datas_cv.all_langs[i];
            let nl=this.name_lang[this.datas_cv.lang][l];
            let elem=document.getElementById(this.menus["lang"].element[nl]);
            elem.addEventListener("click", ()=>{
                this.setLang(l);
                this.loadCVFull(this.datas_cv.lang);
                this.loadMenuLang();
                this.addEventLang();
            });
        }
        
    }

    loadMenuLang(){
        let langs=[];
        for (let i in this.datas_cv.all_langs){
            langs.push(this.name_lang[this.datas_cv.lang][datas_cv.all_langs[i]])
        }
        let m= new menu("menu_lang");
        m.imgMenu="img/lang.png";
        m.top="10px";
        m.left="10px";
        m.putMenu();
        m.addOptions({"elements":langs});
        this.menus["lang"]=m;
        
    }
    loadMenuCategories(){
        let cate=this.datas_cv.all_values_uni("category");
        let options_lang={"es":["ver","detalles"],"en":["show","details"]}
        let ol=options_lang[this.datas_cv.lang]
        let m_cat= new menu("menu_categories");
        m_cat.top="10px";
        m_cat.left="100px";
        m_cat.zIndex=11000;
        m_cat.imgMenu="img/category.png";
        m_cat.putMenu();
        m_cat.addOptions({"elements":cate});
        for (let c in cate){
            let ol_new=ol.map((a)=>a+" "+cate[c])
            m_cat.addOptions({"elements":ol_new,parent:cate[c]});
            
            let cat_elem=[];
            let cat_elem_field={};
            for (let i=0;i< this.datas_cv.data.length;i++){
                if (cate[c]==this.datas_cv.data[i].category){
                    if (this.datas_cv.data[i].text_field !=""){
                        cat_elem.push(this.datas_cv.data[i].text_field);
                        cat_elem_field[this.datas_cv.data[i].field]=this.datas_cv.data[i].text_field;
                    }
                }
            }
            m_cat.addOptions({"elements":cat_elem,parent:ol_new[1]});
            let ol_ele=document.getElementById(m_cat.element[ol_new[0]]);
            ol_ele.innerHTML=ol_ele.innerHTML+'<label class="switch"><input type="checkbox" id="check_'+m_cat.element[ol_new[0]]+'" checked><div class="slider round"></div></label>';
            let show=document.getElementById("check_"+m_cat.element[ol_new[0]]);
            show.addEventListener("click", ()=>{
                let categ=this.datas_cv.categories;
                for (let ca in categ){
                    if (categ[ca]==cate[c]){
                        let div_show=document.getElementById("div_"+ca);
                        if (show.checked){
                            div_show.style.display="block";
                        }else{
                            div_show.style.display="none";
                        }
                    }
                }
    
            });
            
            
            cat_elem.map((a)=>{
                let ol_cat_elem=document.getElementById(m_cat.element[a]);
                ol_cat_elem.innerHTML=ol_cat_elem.innerHTML+'<label class="switch"><input type="checkbox" id="check_'+m_cat.element[a]+'" checked><div class="slider round"></div></label>';
                let show=document.getElementById("check_"+m_cat.element[a]);
                console.log(m_cat.element[a],cat_elem_field,a)
                let key_field="";
                for (let cef in cat_elem_field){
                    if (cat_elem_field[cef]==a){
                        key_field=cef;
                    }
                }
                //this.datas_cv.data[i].field
                
                show.addEventListener("click", ()=>{
                    let div_show=document.getElementById("p_"+key_field);
                    if (show.checked){
                           div_show.style.display="block";
                     }else{
                           div_show.style.display="none";
                     }
                     
  
        
                });
                
            });
             
             
        }
        
        
    }
    loadInformation(){
        //load sections
        let sections='<section role="main" class="container_16 " >';
        let cate=this.datas_cv.all_values_uni("id_category");
        let name_cate=this.datas_cv.all_values_uni("category");
        for (let c=0;c< cate.length;c++){
            let ca=cate[c];
            let section='<div class="grid_16"><div id="div_'+ca+'" class="grid_16  '+ca+'"><h3>'+name_cate[c]+'</h3>';
            
            for (let i=0;i< this.datas_cv.data.length;i++){
                
                if (ca==this.datas_cv.data[i].id_category){
                    
                    if (this.datas_cv.data[i].field!="photoCV"){
                        let info_date="";
                        if (this.datas_cv.data[i].date!=""){
                            info_date='('+this.datas_cv.data[i].date+')';
                        }
                        section=section+'<p id="p_'+this.datas_cv.data[i].field+'"><b>'+this.datas_cv.data[i].text_field+' '+info_date+':</b> <span class="cv_data_extra">'+this.datas_cv.data[i].info+'</span></p>';
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
