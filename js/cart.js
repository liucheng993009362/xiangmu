(function(){
  var products=[
      {
          name:'板鞋',
          pic:'https://img1.fr-trading.com/0/5_181_1630582_300_300.jpg',
          price:'300￥',
          id:2546464
      },
      {
        name:'拉杆箱',
        pic:'https://img1.fr-trading.com/0/3_455_107371_180_186.jpg',
        price:'200￥',
        id:564454
      },
      {
        name:'男装',
        pic:'https://img1.fr-trading.com/0/5_981_1630578_400_400.jpg',
        price:'269￥',
        id:64495656
      },
      {
        name:'早教机',
        pic:'https://img1.fr-trading.com/0/5_27_1630162_400_400.jpg',
        price:'5000￥',
        id:8586458
      },
      {
        name:'玻璃杯',
        pic:'https://img1.fr-trading.com/0/5_410_1694062_400_400.jpg',
        price:'50￥',
        id:7458695
      }
  ]
  class ShoppingCart{
    constructor(containerId,products){
      this.container=document.getElementById(containerId);
      console.log(this.container)
      this.shopList=document.createElement('table');
      this.cartList=document.createElement('table');
      this.products=products;
      this.cartProducts=this.getStorage()||[];
      this.container.appendChild(this.shopList);
      this.container.appendChild(this.cartList);
    }
    setStorage(json){
      localStorage.setItem('cart',JSON.stringify(json));
    }
    getStorage(){
      return JSON.parse(localStorage.getItem('cart'))||[];
    }
    init(){
      this.initShopList();
      if(this.getStorage().lenght>0){
        this.renderCartList();
      }
    }
    initShopList(){
      var str=`<thead>
                  <tr>
                    <th>商品ID</th>
                    <th>商品名称</th>
                    <th>商品图片</th>
                    <th>商品价格</th>
                    <th>操作</th>
                  </tr>
               </thead>`;
      str+='<tbody>';
      this.products.forEach((value) => {
           str+=`<tr>
                    <td>${value.id}</td>
                    <td>${value.name}</td>
                    <td><img src="${value.pic}"></td>
                    <td>${value.price}</td>
                    <td>
                      <a href="javascript:;" class="addCart">加入购物车</a>
                    </td>
                 </tr>`
      });
      str+='</tbody>';
      this.shopList.innerHTML=str;
      this.addCartListEvent();
    }
    addCartListEvent(){
      var that=this;
      var addCartBtnArr=this.container.querySelectorAll('.addCart');
      addCartBtnArr.forEach((addCartBtn)=>{
        addCartBtn.onclick=function(){
          var tr=this.parentNode.parentNode;
          var currentProduct={
            name:tr.children[1].innerHTML,
            price:tr.children[3].innerHTML,
            pic:tr.children[2].children[0].src,
            id:tr.children[0].innerHTML,
          }
          that.addToCartProducts(currentProduct);
          that.renderCartList();
        }
      })
    }
    addToCartProducts(currentProduct){
      this.cartProducts=this.getStorage();
      for(var i=0;i<this.cartProducts.length;i++){
        if(this.cartProducts[i].id==currentProduct.id){
          this.cartProducts[i].num++;
          this.setStorage(this.cartProducts);
          return;
        }
      }
      currentProduct.num=1;
      this.cartProducts.push(currentProduct);
      this.setStorage(this.cartProducts);
    }
    renderCartList(){
      var str = `<thead>
                  <tr>
                    <th>商品ID</th>
                    <th>商品名称</th>
                    <th>商品图片</th>
                    <th>商品价格</th>
                    <th>商品数量</th>
                    <th>操作</th>
                  </tr>
                </thead>`;
        str+='<tbody>';
        this.getStorage().forEach((product)=>{
          str+=`<tr>
                  <td>${product.id}</td>
                  <td>${product.name}</td>
                  <td>
                    <img src="${product.pic}">
                  </td>
                  <td>${product.price}</td>
                  <td class="change">
                    <span class="jian">-</span>
                    ${product.num}
                    <span class="jia">+</span>
                  </td>
                  <td>
                    <a href="javascript:;" class="del">删除</a>
                  </td>
                </tr>`
        });
        str+='</tbody>';
        this.cartList.innerHTML=str;
        this.deleteProductEvent();
        this.changeNumEvent();
    }
    changeNumEvent(){
      var that=this;
      var changeNumTdArr=this.container.querySelectorAll('.change');
      changeNumTdArr.forEach((changeNumTd)=>{
        changeNumTd.onclick=function(e){
            var target=e.target;
            var id=this.parentNode.children[0].innerHTML;
            if(e.target.className=="jian"){
              that.jianNum(id);
              that.renderCartList();
            }
            if(e.target.className=="jia"){
              that.jiaNum(id)
              that.renderCartList();
            }
        }
      })
    }
    jianNum(id){
      var arr=this.getStorage();
      for(var i=0;i<arr.length;i++){
        if(arr[i].id==id){
          arr[i].num--;
          this.setStorage(arr);  
          if(arr[i].num<=0){
            this.deleteFromCartProducts(id);
             return;
          }
          this.renderCartList();
          return;
        }
      }
    }
    jiaNum(id){
          var arr = this.getStorage();
          for(var i=0;i<arr.length;i++){
            if(arr[i].id==id){
              arr[i].num++;					
              this.setStorage(arr);
              return;
            }
          }
    }
    deleteProductEvent(){
      var that=this;
      var delBtnAll=this.container.querySelectorAll('.del');
      delBtnAll.forEach((delBtn)=>{
        delBtn.onclick=function(){
          var id=this.parentNode.parentNode.children[0].innerHTML;
          that.deleteFromCartProducts(id);
          that.renderCartList();
        }
      })
    }
    deleteFromCartProducts(id){
      this.cartProducts=this.getStorage();
      this.cartProducts=this.cartProducts.filter((product)=>{
        if(product.id==id){
          return false;
        }else{
          return true;
        }
      });
      this.setStorage(this.cartProducts);
    }
  }
  var car = new ShoppingCart("container",products);
	car.init()
})()