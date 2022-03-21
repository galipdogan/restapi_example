$(document).ready(function () {
    var yerler = $.getJSON('/api/yerler');

    yerler
    .then(yerlerEkle);

    $('#bizimInput').keypress((e) => {
        if (e.which == 13) {
            yeniSehirEkle();
        }
    })

    $('.yerler').on('click','.fa',function () {
        var tiklanan=$(this).parent().parent()
        //console.log(tiklanan);
        var silinenURL='/api/yerler/'+ tiklanan.data('id')
        $.ajax({
            method:"DELETE",
            url:silinenURL
        })
        .then((silinenData)=>{
            //console.log(silinenData);
            tiklanan.remove();
        })
    })

    $('.yerler').on('click','li',function () {
        //console.log($(this.data,'ziyaretDurumu'));
        ziyaretDurumuGuncelle($(this))
    })
    
})

function yerlerEkle(yerler) {
    yerler.forEach(function (yer) {
        yerEkle(yer);
    });
}

function yerEkle(yer) {
    var yeniYer = $('<li class="yerlerimiz">' + yer.isim + '<span> <i class="fa fa-trash" </span> </li>')
    //silinmesi icin gereken id
    yeniYer.data('id',yer._id)

    //ziyaret edilme odurmunu kontrol edebilmek icin olusturdugumuz data
    yeniYer.data('ziyaretDurumu',yer.ziyaret);

    if (yer.ziyaret==true) {
        $(yeniYer).addClass('ziyaretEdilmis')
    }

    $('.yerler').append(yeniYer);
}

function yeniSehirEkle() {
    var yeniSehir = $('#bizimInput').val();


    $.post('/api/yerler', { isim: yeniSehir })
        .then((yeniEklenenSehir) => {
            yerEkle(yeniEklenenSehir);
            $('#bizimInput').val('')
        })
}

function ziyaretDurumuGuncelle(yer) {
    var guncellemeURL='/api/yerler/'+yer.data('id')
    var ziyaretDurumu=yer.data('ziyaretDurumu')
    var guncelle={ziyaret:!ziyaretDurumu}
    console.log(guncelle);
    $.ajax({
        method:"PUT",
        url:guncellemeURL,
        data:guncelle
    })
    .then((guncellenmisYer)=>{
        //console.log(guncellenmisYer);
        yer.toggleClass('ziyaretEdilmis')
        yer.data('ziyaretDurumu',!ziyaretDurumu)
    })
}