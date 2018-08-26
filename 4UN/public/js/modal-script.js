function changeModal(id,e){
        e.preventDefault()
        $.ajax({
            url: "Meme",
            method: "get",
            data: {
                id
            },
            success: function (newdoc) {
                console.log(newdoc)
            }

        })
}
