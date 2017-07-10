

class CV{
    constructor(datas_cv){
        this.name_lang={'es':{'es':'español','en':'inglés'},'en':{'es':'spanish','en':'english'}};
        this.menus={};
        this.datas_cv= datas_cv;
        this.loadCVFull(this.datas_cv.lang);
        this.loadMenuLang();
        this.addEventLang();
        this.addEventMenuButton();
        
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
    addEventMenuButton(){

        let img=document.getElementById("menu_button_img");
        img.addEventListener("click", ()=>{
            let menu=document.getElementById("principal_1");
            if (menu.style.display=="none" || menu.style.display==""){
                menu.style.transition="1s";
                menu.style.display="block";
                menu.style.width="100px";
                document.getElementById("principal_2").style.marginLeft = "100px";
            }else{
                menu.style.display="none";
                 menu.style.width="0";
                document.getElementById("principal_2").style.marginLeft = "0";
            }
            
        });

        
    }
    loadMenuLang(){
        let langs=[];
        for (let i in this.datas_cv.all_langs){
            langs.push(this.name_lang[this.datas_cv.lang][datas_cv.all_langs[i]])
        }
        let m= new menu("menu_lang");
        m.imgMenu="img/lang.png";
        m.top="70px";
        m.left="10px";
        m.zIndex=12000;
        m.putMenu();
        m.addOptions({"elements":langs});
        this.menus["lang"]=m;
        
    }
    loadMenuCategories(){
        let cate=this.datas_cv.all_values_uni("category");
        let options_lang={"es":["ver","detalles"],"en":["show","details"]}
        let ol=options_lang[this.datas_cv.lang]
        let m_cat= new menu("menu_categories");
        m_cat.top="170px";
        m_cat.left="10px";
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
    loadMenuExport(){
        let options_export={"es":["exportar a PDF"],"en":["export to PDF"]}
        let exportar=options_export[this.datas_cv.lang]
        let m= new menu("menu_export");
        m.imgMenu="img/export.png";
        m.top="260px";
        m.left="10px";
        m.zIndex=10000;
        m.putMenu();
        m.addOptions({"elements":exportar});
        
        let elem_exp=document.getElementById(m.element[exportar[0]]);
        elem_exp.addEventListener("click", ()=>{
            /*let pdf = new jsPDF('p', 'pt', 'a4')
            let menu=document.getElementById('menu');
            let header=document.getElementById('div_header');
            let state_menu=menu.style.display;
            let state_header=header.style.display;
            menu.style.display="none";
            header.style.display="none";
            let options = {
                format:PNG,
                h:100,
                w:100,
                pagesplit: true,
            }
            pdf.addHTML(document.body,options,function() { let string = pdf.save('curriculumFMA');});*/
            //doc.fromHTML($('#container').html(), 10, 10);
            //doc.save('curriculum.pdf');
            //$( "#container" ).print();
            window.print();
            /*menu.style.display=state_menu;
            header.style.display=state_header;*/

        });
        
    }
    loadMenuSupport(){
        let options_support={"es":["Cuestiones"],"en":["issues"]}
        let options_menu=options_support[this.datas_cv.lang]
        let m= new menu("menu_support");
        m.imgMenu="img/export.png";
        m.top="350px";
        m.left="10px";
        m.zIndex=9000;
        m.putMenu();
        m.addOptions({"elements":options_menu});
        
        let elem_exp=document.getElementById(m.element[options_menu[0]]);
        elem_exp.addEventListener("click", ()=>{
           let url="https://github.com/PhoenixAlx/Curriculum/issues";
           window.open(url, '_blank');


        });
        
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
                        if (this.datas_cv.data[i].units!=undefined && this.datas_cv.data[i].units!=""){
                            info_date=' ('+this.datas_cv.data[i].value+" "+this.datas_cv.data[i].units+')';
                        }
                        section=section+'<p id="p_'+this.datas_cv.data[i].field+'"><b>'+this.datas_cv.data[i].text_field+''+info_date+':</b> <span class="cv_data_extra">'+this.datas_cv.data[i].info+'</span></p>';
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
        this.loadMenuExport();
        this. loadMenuSupport();
        this.loadHeader();
        this.loadInformation();
    } 
}
