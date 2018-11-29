//在外部js中获取res.render()传递的数据
// 每4个博客为一页
const blogsList = document.getElementById('blogsList');
const pagesList = document.getElementById('pagesList');
const introduction = document.getElementById('introduction');
const pageNo = parseInt(document.getElementById('pageNo').innerHTML);
const blogCount = parseInt(document.getElementById('blogsCount').innerHTML);
// 剩余全文
let surplusContent = [];
// 创建页码列表
for(let i = 1; i <= Math.ceil(blogCount / 4); i++){
    const page = document.createElement('li');
    if(i === 1) {
        page.innerHTML = "<a href='/'>" + i + "</a>";
    } else {
        page.innerHTML = "<a href='/index/" + i + "'>" + i + "</a>";
    }
    pagesList.appendChild(page);
}

if(pagesList.children[pageNo - 1]) {
  pagesList.children[pageNo - 1].className = 'active';
}

// 博客列表
for(let i = 0, t = 0; i < 4; i++) { 

    const par = blogsList.children[i].getElementsByTagName('p')[0];
    const timePar = blogsList.children[i].getElementsByTagName('p')[1];

    const comment = blogsList.children[i].getElementsByClassName('comments')[0];
    const thisblogid = i;
    let needCanvas = false;
    //正文
    par.innerHTML = par.innerHTML.replace(/\n/g,'</br>').replace(/&lt;b&gt;/g,'<b>').replace(/&lt;\/b&gt;/g,'</b>').replace(/&lt;i&gt;/g,'<i>').replace(/&lt;\/i&gt;/g,'</i>');

    // 需要展开全文
    if (par.innerHTML.length > 230) {
        surplusContent[i] = par.innerHTML.slice(200);
        par.innerHTML = (par.innerHTML.slice(0, 200) + '...').replace(/\n/g,'</br>').replace(/&lt;b&gt;/g,'<b>').replace(/&lt;\/b&gt;/g,'</b>').replace(/&lt;i&gt;/g,'<i>').replace(/&lt;\/i&gt;/g,'</i>')
                        + `<button id="spread" onclick="spread(${i})">展开全文<canvas class="myCanvas" width="10" height="10" style="margin-left:5px;"></canvas></button>`;
        needCanvas = true;
    }

    //时间
    let timeParText = timePar.innerHTML.split(' ').slice(1).reverse();
    switch(timeParText[2]) {
        case 'Jan': timeParText[2] = '1'; break;
        case 'Feb': timeParText[2] = '2'; break;
        case 'Mar': timeParText[2] = '3'; break;
        case 'Apr': timeParText[2] = '4'; break;
        case 'May': timeParText[2] = '5'; break;
        case 'Jun': timeParText[2] = '6'; break;
        case 'Jul': timeParText[2] = '7'; break;
        case 'Aug': timeParText[2] = '8'; break;
        case 'Sep': timeParText[2] = '9'; break;
        case 'Oct': timeParText[2] = '10'; break;
        case 'Nov': timeParText[2] = '11'; break;
        case 'Dec': timeParText[2] = '12'; break;
    }
    timePar.innerHTML = `编辑于 ${timeParText[0]}-${timeParText[2]}-${timeParText[1]}`
    
    // 评论
    // 此博客是否有评论
    let hasComments = false;
    // 评论对象
    let comments;
    const commentsList = document.createElement('ul');
    const commentBox = blogsList.children[i].getElementsByClassName('commentBox')[0];
    // 获取后台获得的评论数据
    if(blogsList.children[i].getElementsByClassName('commentsFromServer')[0].innerHTML){
        comments = JSON.parse(blogsList.children[i].getElementsByClassName('commentsFromServer')[0].innerHTML);
    } 
    if(comments) {
        hasComments = true;
    }
    for(let i = 0; hasComments && i < comments.length; i++) {
        const commentsListItem = document.createElement('li');
        commentsListItem.innerHTML = `${comments[i].user}: <span>${comments[i].time.slice(0, 10)}</span><p>${comments[i].comment}</p>`;  
        commentsList.appendChild(commentsListItem);
    }  
    commentBox.appendChild(commentsList);
    commentBox.innerHTML += '<form><input type="text" placeholder="请写下你的评论"><button id="submitCommentButton" type="button">评论</button></form>';
    blogsList.children[i].appendChild(commentBox);
    commentBox.getElementsByTagName('button')[0].addEventListener('click', () => {
        const request = new XMLHttpRequest();
        request.open('POST', '/api/submitComment', true);
        request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        request.send(`blogid=${thisblogid}&comment=${commentBox.getElementsByTagName('input')[0].value}&pageNo=${pageNo}`);
        request.onreadystatechange = () => {
            if(request.readyState === 4 && request.status === 200) {
                const responseText = JSON.parse(request.responseText);
                const newComment = document.createElement('li');
                newComment.innerHTML = `${responseText.user}: <span>${responseText.time.slice(0, 10)}</span><p>${responseText.comment}</p>`; 
                commentsList.appendChild(newComment);
                commentBox.removeChild(commentBox.firstChild);
                commentBox.prepend(commentsList);
                commentBox.getElementsByTagName('input')[0].value = "";
            }
        };
    });  
    comment.addEventListener('click', function clickComments() {
        this.innerHTML = '<img src="/images/comments-solid.svg">收起评论';
        this.className = 'hideComments';
        this.removeEventListener('click', clickComments);
        commentBox.style.display = 'block';
        this.addEventListener('click', () => {
            this.innerHTML = '<img src="/images/comments-solid.svg">评论';
            this.className = 'comments';
            this.addEventListener('click', clickComments);
            commentBox.style.display = 'none';
        });          
    });

    const thumbsUpButton = blogsList.children[i].getElementsByClassName('thumbsUpButton')[0];
    thumbsUpButton.addEventListener('click', () => {
        const request = new XMLHttpRequest();
        request.open('POST', '/api/thumbsUp', true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(`blogid=${thisblogid}&pageNo=${pageNo}`);
        request.onreadystatechange = () => {
            if(request.readyState === 4 && request.status === 200) {
                let responseText = JSON.parse(request.responseText);
                console.log('nowDownloadTimes', JSON.parse(request.responseText));
                thumbsUpButton.innerHTML = `<img src="/images/thumbs-up-${responseText.svgStatus}.svg"><span>${responseText.thumbsUpcount}</span>`;
                thumbsUpButton.className = `${responseText.classStatus} thumbsUpButton`;
            }
        }
    })
    // 向下箭头
    if (needCanvas) {
        let canvas = document.getElementsByClassName('myCanvas')[t];
        let ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#175199'
        ctx.moveTo(0, 0);
        ctx.lineTo(5, 8);
        ctx.lineTo(10, 0);
        ctx.stroke();
        t++;
    }

}
// 展开全文
function spread (i) {
    let par = document.getElementById('blogsList').getElementsByClassName('content')[i];
    par.innerHTML = (par.innerHTML.slice(0, 200) + surplusContent[i]).replace(/\n/g,'</br>').replace(/&lt;b&gt;/g,'<b>').replace(/&lt;\/b&gt;/g,'</b>').replace(/&lt;i&gt;/g,'<i>').replace(/&lt;\/i&gt;/g,'</i>');
}

// 点击下拉列表
document.getElementById('collapseButton').addEventListener('click', () => {
    if(document.getElementsByClassName('nav')[0].className === 'nav hidingMenu') {
        document.getElementsByClassName('nav')[0].className = 'nav showingMenu';
    } else {
        document.getElementsByClassName('nav')[0].className = 'nav hidingMenu';
    }
})