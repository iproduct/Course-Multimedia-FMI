/* 
 * Drag and drop demo
 */
function dragStart(event) {
    event.dataTransfer.setData("productId", event.target.id);
}


function dragOver(event) {
    event.preventDefault();
}


function dropProduct(event) {
    event.preventDefault();
    var productId = event.dataTransfer.getData("productId");
    console.log(productId);
    var product = document.getElementById(productId);
    console.log(product);

    console.log(event.target);
    event.target.innerHtml = "";
    event.target.appendChild(product);
}

