// 文本框不能自动换行
const blogs = document.getElementById('blogsFromServer').innerHTML ? JSON.parse(document.getElementById('blogsFromServer').innerHTML) : '';

const submit = document.getElementById('submit')
const completeEdit = document.getElementById('completeEdit')
const title = document.getElementById('title')
const content = document.getElementById('content')
const blogsList = document.getElementById('blogsList')

// 文本编辑
document.getElementById('bold').addEventListener('click', () => {
    if(content.selectionEnd - content.selectionStart > 0)
    content.value = `${ content.value.substring(0, content.selectionStart) }<b>${ content.value.substring(content.selectionStart, content.selectionEnd) }</b>${ content.value.substring(content.selectionEnd) }`
})
document.getElementById('italic').addEventListener('click', () => {
    if(content.selectionEnd - content.selectionStart > 0)
    content.value = `${ content.value.substring(0, content.selectionStart) }<i>${ content.value.substring(content.selectionStart, content.selectionEnd) }</i>${ content.value.substring(content.selectionEnd) }`

})
submit.addEventListener('click',() => {
    if(title.value.length === 0 || content.value.length === 0) {
        alert("标题或正文不能为空！")
    } else {
        const request = new XMLHttpRequest()
        request.open('POST', '/api/submitBlog', true)
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        request.send(`title=${ title.value }&content=${ content.value }&time=${ new Date().toString().slice(0,15) }`)
    }
})

for(let i = 0, len = blogs.length; i < len; i++) { 
    if(i >= blogs.length || blogs === "") break
    const header = document.createElement('h3')
    const par = document.createElement('p')
    const timePar = document.createElement('p')
    const blogItem = document.createElement('li')
    const deleteButton = document.createElement('a')
    const editButton = document.createElement('a')
    const blog = blogs[i]
    header.innerHTML = blog.title
    //文本换行功能textarea属性wrap为hard
    //将\n替换为</br>
    par.innerHTML = blog.content.replace(/\n/g,'</br>')
    par.innerHTML = par.innerHTML.replace(/&lt;b&gt;/g,'<b>')
    par.innerHTML = par.innerHTML.replace(/&lt;\/b&gt;/g,'</b>')
    par.innerHTML = par.innerHTML.replace(/&lt;i&gt;/g,'<i>')
    par.innerHTML = par.innerHTML.replace(/&lt;\/i&gt;/g,'</i>')
    timePar.innerHTML = blog.time
    const thisblogid = blog._id
    //还要重新刷新一下
    deleteButton.innerHTML = "删除"
    deleteButton.href = '/blogs'
    deleteButton.className = 'modifyButton'
    editButton.innerHTML = "编辑"
    editButton.href = '#'
    editButton.className = 'modifyButton'
    deleteButton.addEventListener('click', () => {
        const request = new XMLHttpRequest()
        request.open('POST', '/api/deleteBlog', true)
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        request.send(`blogid=${thisblogid}`)
    })
    editButton.addEventListener('click', () => {
        title.value = header.innerHTML;
        content.value = par.innerHTML;
        submit.style.display = 'none';
        completeEdit.style.display = 'block';
        const request = new XMLHttpRequest();
        completeEdit.addEventListener('click', () => {
            request.open('POST', '/api/editBlog', true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send(`title=${title.value}&content=${content.value}&blogid=${thisblogid}`);
        })
    })
    blogItem.appendChild(header)
    blogItem.appendChild(par)
    blogItem.appendChild(timePar)
    blogItem.appendChild(editButton)
    blogItem.appendChild(deleteButton)
    blogsList.appendChild(blogItem)
}