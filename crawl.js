const { JSDOM } = require('jsdom');

async function crawlPage(currentURL){
    console.log(`active crawling ${currentURL}`)
    try{
        const resp = await fetch(currentURL)
        if (resp.status > 399){
            console.log(`error in fetch with statusCode: ${resp.status}, on page ${currentURL}`)
            return 
        }
        const contentType = resp.headers.get('content-type')
        if (!contentType.includes("text/html")) {
            console.log(`non html response, content type: ${contentType}, on page ${currentURL}`)
            return 
        }
        console.log(await resp.text());
        }catch(err){
        console.log(`error in fetch ${err.message}, on page ${currentURL}`)
    }
    
}

function getUrlFromHTML(htmlBody, baseUrl) {
    
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkELements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkELements) {
        if(linkElement.href.slice(0,1) === '/'){
            //relative path
            try{
                const urlObj = new URL(`${baseUrl}${linkElement.href}`)
                urls.push(urlObj.href)
            }catch(err){
                console.log(`error with relative path ${err.message}`)
            }
            
        }else{
            try{
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            }catch(err){
                console.log(`error with absolute path ${err.message}`)
            }
        }
        }
    return urls
}

function normalizeURL(urlString){
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    return hostPath.slice(-1) === '/' ?  hostPath.slice(0, -1) : hostPath
}


module.exports = {
    normalizeURL: normalizeURL,
    getUrlFromHTML: getUrlFromHTML,
    crawlPage:crawlPage
    
}