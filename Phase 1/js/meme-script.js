//meme array
var memelist = [];
//json object
var Meme = function (title,owner,desc,url,tags,tag_urls, status){
    this.title = title;
    this.owner = owner;
    this.desc = desc;
    this.url = url;
    this.tags = tags;
    this.tag_urls = tag_urls;
    this.status = status;
}

function newMeme(MEME,x){

    //Main modal
    var modalDiv = document.createElement("div")
    $(modalDiv).addClass("modal fade")
    $(modalDiv).attr("id", "meme" + x)
    $(modalDiv).attr("tabindex","-1")
    $(modalDiv).attr("role", "dialog")
    $(modalDiv).attr("aria-labelledby", "exampleModalLabel")
    $(modalDiv).attr("aria-hidden","true")
    var modalDiagDiv = document.createElement("div")
    $(modalDiagDiv).addClass("modal-dialog")
    $(modalDiagDiv).attr("role","document")
    var modalContDiv = document.createElement("div")
    $(modalContDiv).addClass("modal-content")

    //Modal Head
    var modalHeadDiv = document.createElement("div")
    $(modalHeadDiv).addClass("modal-header")
    var h5Heading = document.createElement("div")
    $(h5Heading).addClass("modal-title")
    $(h5Heading).attr("id","exampleModalLabel")
    var memeTitle = document.createTextNode(MEME.title)
    $(h5Heading).append(memeTitle)
    var modalSubheadDiv = document.createElement("div")
    $(modalSubheadDiv).addClass("modal-subheading")
    var memeOwner = document.createTextNode("By ")
    var memeOwnerLink = document.createElement("a")
    $(memeOwnerLink).attr("href","user2.html")
    var ownerName = document.createTextNode(MEME.owner)
    /*Public or Private*/
    var memeStatus = document.createTextNode(" | " + MEME.status)
    $(memeOwnerLink).append(ownerName)
    $(modalSubheadDiv).append(memeOwner)
    $(modalSubheadDiv).append(memeOwnerLink)
    $(modalSubheadDiv).append(memeStatus)
    $(modalHeadDiv).append(h5Heading)
    $(modalHeadDiv).append(modalSubheadDiv)

    //Modal Body
    var modalBodyDiv = document.createElement("div")
    $(modalBodyDiv).addClass("modal-body")
    var memeImg = document.createElement("img")
    $(memeImg).attr("src",MEME.url)
    var descSpan = document.createElement("span")
    $(descSpan).addClass("description")
    var memeDesc = document.createTextNode(MEME.desc)
    $(descSpan).append(memeDesc)
    $(modalBodyDiv).append(memeImg)
    $(modalBodyDiv).append(descSpan)

    //Modal Footer
    var modalFootDiv = document.createElement("div")
    $(modalFootDiv).addClass("modal-footer")
    var memeTagsDiv = document.createElement("div")
    $(memeTagsDiv).addClass("tags")
    var tagLabelDiv = document.createElement("div")
    var tagStng = document.createTextNode("Tags:")
    $(tagLabelDiv).append(tagStng)
    $(memeTagsDiv).append(tagLabelDiv)

    //used for adding href to tags
    var i = 0;

    MEME.tags.forEach((tag)=>{
        var memeTag = document.createElement("div")
        $(memeTag).addClass("memetag")
        var tagRef = document.createElement("a")
        $(tagRef).attr("href",MEME.tag_urls[i])
        var tagLabel = document.createTextNode(tag)
        $(tagRef).append(tagLabel)
        if (MEME.status == "Private"){
            var removeButton = document.createElement("button")
            $(removeButton).attr("type","button")
            $(removeButton).attr("style","display: none")
            var removeIcon = document.createElement("i");
            $(removeIcon).addClass("fa fa-close")
            $(removeButton).css({
                "width": "32px",
                "height": "32px",
                "background-color": "transparent",
                "border": "none",
                "cursor": "pointer",
                "margin-left": "-4px"
            })
            $(".fa-close").css({
                "color": "black",
                "font-size": "24px"
            })
            $(removeButton).append(removeIcon)
        }
        $(memeTag).append(tagRef)
        if (removeButton != null){
            $(memeTag).append(removeButton)
        }

        $(memeTagsDiv).append(memeTag)
        i++;
    })
    var closeButton = document.createElement("button")
    $(closeButton).addClass("btn btn-secondary")
    $(closeButton).attr("type","button")
    $(closeButton).attr("data-dismiss","modal")
    var closeLabel = document.createTextNode("Close")
    $(closeButton).append(closeLabel)
    $(modalFootDiv).append(memeTagsDiv)
    $(modalFootDiv).append(closeButton)

    //Adding the modal
    $(modalContDiv).append(modalHeadDiv)
    $(modalContDiv).append(modalBodyDiv)
    $(modalContDiv).append(modalFootDiv)
    $(modalDiagDiv).append(modalContDiv)
    $(modalDiv).append(modalDiagDiv)
    $("body").append(modalDiv)

    memelist.push(MEME)

    console.log(memelist)
}

function newMemeLoggedOff(MEME,x){

    //Main modal
    var modalDiv = document.createElement("div")
    $(modalDiv).addClass("modal fade")
    $(modalDiv).attr("id", "meme" + x)
    $(modalDiv).attr("tabindex","-1")
    $(modalDiv).attr("role", "dialog")
    $(modalDiv).attr("aria-labelledby", "exampleModalLabel")
    $(modalDiv).attr("aria-hidden","true")
    var modalDiagDiv = document.createElement("div")
    $(modalDiagDiv).addClass("modal-dialog")
    $(modalDiagDiv).attr("role","document")
    var modalContDiv = document.createElement("div")
    $(modalContDiv).addClass("modal-content")

    //Modal Head
    var modalHeadDiv = document.createElement("div")
    $(modalHeadDiv).addClass("modal-header")
    var h5Heading = document.createElement("div")
    $(h5Heading).addClass("modal-title")
    $(h5Heading).attr("id","exampleModalLabel")
    var memeTitle = document.createTextNode(MEME.title)
    $(h5Heading).append(memeTitle)
    var modalSubheadDiv = document.createElement("div")
    $(modalSubheadDiv).addClass("modal-subheading")
    var memeOwner = document.createTextNode("By ")
    var memeOwnerLink = document.createElement("a")
    $(memeOwnerLink).attr("href","user2-public.html")
    var ownerName = document.createTextNode(MEME.owner)
    /*Public or Private*/
    var memeStatus = document.createTextNode(" | " + MEME.status)
    $(memeOwnerLink).append(ownerName)
    $(modalSubheadDiv).append(memeOwner)
    $(modalSubheadDiv).append(memeOwnerLink)
    $(modalSubheadDiv).append(memeStatus)
    $(modalHeadDiv).append(h5Heading)
    $(modalHeadDiv).append(modalSubheadDiv)

    //Modal Body
    var modalBodyDiv = document.createElement("div")
    $(modalBodyDiv).addClass("modal-body")
    var memeImg = document.createElement("img")
    $(memeImg).attr("src",MEME.url)
    var descSpan = document.createElement("span")
    $(descSpan).addClass("description")
    var memeDesc = document.createTextNode(MEME.desc)
    $(descSpan).append(memeDesc)
    $(modalBodyDiv).append(memeImg)
    $(modalBodyDiv).append(descSpan)

    //Modal Footer
    var modalFootDiv = document.createElement("div")
    $(modalFootDiv).addClass("modal-footer")
    var memeTagsDiv = document.createElement("div")
    $(memeTagsDiv).addClass("tags")
    var tagLabelDiv = document.createElement("div")
    var tagStng = document.createTextNode("Tags:")
    $(tagLabelDiv).append(tagStng)
    $(memeTagsDiv).append(tagLabelDiv)

    //used for adding href to tags
    var i = 0;

    MEME.tags.forEach((tag)=>{
        var memeTag = document.createElement("div")
        $(memeTag).addClass("memetag")
        var tagRef = document.createElement("a")
        $(tagRef).attr("href",MEME.tag_urls[i])
        var tagLabel = document.createTextNode(tag)
        $(tagRef).append(tagLabel)
        if (MEME.status == "Private"){
            var removeButton = document.createElement("button")
            $(removeButton).attr("type","button")
            $(removeButton).attr("style","display: none")
            var removeIcon = document.createElement("i");
            $(removeIcon).addClass("fa fa-close")
            $(removeButton).css({
                "width": "32px",
                "height": "32px",
                "background-color": "transparent",
                "border": "none",
                "cursor": "pointer",
                "margin-left": "-4px"
            })
            $(".fa-close").css({
                "color": "black",
                "font-size": "24px"
            })
            $(removeButton).append(removeIcon)
        }
        $(memeTag).append(tagRef)
        if (removeButton != null){
            $(memeTag).append(removeButton)
        }

        $(memeTagsDiv).append(memeTag)
        i++;
    })
    var closeButton = document.createElement("button")
    $(closeButton).addClass("btn btn-secondary")
    $(closeButton).attr("type","button")
    $(closeButton).attr("data-dismiss","modal")
    var closeLabel = document.createTextNode("Close")
    $(closeButton).append(closeLabel)
    $(modalFootDiv).append(memeTagsDiv)
    $(modalFootDiv).append(closeButton)

    //Adding the modal
    $(modalContDiv).append(modalHeadDiv)
    $(modalContDiv).append(modalBodyDiv)
    $(modalContDiv).append(modalFootDiv)
    $(modalDiagDiv).append(modalContDiv)
    $(modalDiv).append(modalDiagDiv)
    $("body").append(modalDiv)

    memelist.push(MEME)

    console.log(memelist)
}

 //removes share with if meme is public
function isPublic(){
            var checkbox = document.getElementById("publicChk");
            var share = document.getElementById("shareUpload");
            
            if(checkbox.checked == true){
                share.style.display = "none";
            }
            else{
                share.style.display = "block";
            }
}