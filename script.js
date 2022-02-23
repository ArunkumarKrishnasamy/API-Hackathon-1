let title_element= document.getElementById("title")
title_element.classList.add("fs-1","font-monospace","text-center", "mt-5","container","title")
title_element.innerText = "Makeup API"
let para =document.createElement("p")
para.classList.add("fs-5","fw-light","text-center","mt-5","description")
para.innerText= "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam sequi magni dolorum, iure odit enim, quibusdam asperiores quaerat recusandae veritatis nobis tenetur velit distinctio eum aperm."
title_element.appendChild(para);

 fetch("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
 .then((x) => x.json())
 .then(response=>{
   console.log(response);

   let currentpage=1;
 let rows= 5 ;
 let page_count=Math.ceil(response.length / rows);

 function Displaylist(items,list_element,rows_per_page,page) {
  list_element.innerHTML="";
  page--;
  let from = page * rows_per_page;
  let to = from + rows_per_page;
  let paginated_items=items.slice(from,to)

    let content= document.getElementById("content")
   content.classList.add( "container", "fs-5","m-5")
   paginated_items.map((item)=>{

    let image = document.createElement("img")
    image.classList.add("col-sm-12","col-md-4","col-lg-4","col-xl-4","img-fluid","d-flex", "justify-content-end","rounded", "img-thumbnail","mb-4")
     image.src =item.api_featured_image
     content.appendChild(image);
    
    let body =document.createElement("div")
    body.classList.add("col-sm-12","col-md-8","col-lg-8","col-xl-8")
         let id= document.createElement("p")
         id.classList.add("fs-4", "fw-bolder","text-primary")
         id.innerHTML =`ID : ${item.id}` ;
         body.appendChild(id);
    
         let brand= document.createElement("p")
         brand.innerText = `Brand : ${item.brand}` ;
         brand.classList.add("fs-4","text-dark") 
         body.appendChild(brand);
    
         let name= document.createElement("p")
         name.innerText = `Name : ${item.name}` ;
         name.classList.add("fs-4","text-dark")
         body.appendChild(name);
    
         let price= document.createElement("p")
         price.innerText =`Price : $${item.price}` ;
         price.classList.add("fs-3", "fw-bolder","text-success")
         body.appendChild(price);
    
         let description= document.createElement("p")
         description.innerText = `Description : ${item.description}`;
         description.classList.add("fs-5","text-muted","g-0")
         body.appendChild(description);
         
         let productlink=document.createElement('a')
         productlink.innerText = "Click here to Buy"
         productlink.setAttribute("target", "_blank")
         productlink.href = item.product_link ;
         productlink.classList.add("mt-0","text-warning","fs-3")
    
         body.appendChild(productlink);
         content.appendChild(body);
       })
 }

Displaylist(response,content,rows,currentpage)

let pagination_element=document.getElementById("buttons")

function setup_pagination(items,pagination_element){
  pagination_element.innerHTML="";
  previous_button(pagination_element);

  for(let i=1;i<=page_count;i++){
    let btn= paginationbutton(i,items);
    pagination_element.appendChild(btn);
  }

  nextbutton(pagination_element)
}

function paginationbutton(page,items){
   
  let button=document.createElement("button");
      button.innerText=page;
      if(currentpage==page) {
      button.classList.add("active")
    }

    button.addEventListener("click",()=>{
    currentpage=page;
    Displaylist(response,content,rows,currentpage)

    let current_btn=document.querySelector(".pagination button.active");
    current_btn.classList.remove("active");
    button.classList.add("active")
    })
   
  return button;
  }
  function previous_button(pagination_element){
    let prevbtn=document.createElement("button");
    prevbtn.innerText= "Prev" ;
    pagination_element.appendChild(prevbtn);
    prevbtn.addEventListener("click", ()=>{
      if(currentpage==1){
  document.querySelector(".pagination prevbtn").disabled= true;
      }
    else{
      currentpage=currentpage-1;
      Displaylist(response,content,rows,currentpage)
    }
  })
  }
  function nextbutton(pagination_element) {
    nextbtn =document.createElement("button")
    nextbtn.innerText="Next"
    pagination_element.appendChild(nextbtn)
    nextbtn.addEventListener("click", ()=>{
      if(currentpage==page_count){
  document.querySelector(".pagination prevbtn").disabled= true;
      }
    else{
      currentpage=currentpage+1;
      Displaylist(response,content,rows,currentpage)
    }
  })
}

setup_pagination(response,pagination_element);

 })
 .catch(er=>{
   console.error(er);
 })