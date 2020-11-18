function blobToDataURL(blob) {
    var a = new FileReader();
     a.readAsDataURL(blob);//读取文件保存在result中
    a.onload = function (e) {
        var getRes = e.target.result;//读取的结果在result中
    }
    return getRes;

}

