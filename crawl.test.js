const { normalizeURL, getUrlFromHTML} = require('./crawl.js')
const { test, expect }                = require('@jest/globals')

test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
});

test('normalizeURL strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
});

test('normalizeURL capitals', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
});

test('normalizeURL strip http', () => {
    const input = 'http://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
});

test('getUrlFromHTML absolute', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev/path/">
            Boot.dev Blog
        </a>  
    </body>
</html>|
`
    const inputBaseURl = "https://blog.boot.dev"
    const actual = getUrlFromHTML(inputHTMLBody, inputBaseURl)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
});

test('getUrlFromHTML relative', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="/path/">
            Boot.dev Blog
        </a>  
    </body>
</html>|
`
    const inputBaseURl = "https://blog.boot.dev"
    const actual = getUrlFromHTML(inputHTMLBody, inputBaseURl)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
});

test('getUrlFromHTML relative & absolute', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev/path1/">
            Boot.dev Blog Path One
        </a> 
        <a href="/path2/">
            Boot.dev Blog Path Two
        </a> 
    </body>
</html>|
`
    const inputBaseURl = "https://blog.boot.dev"
    const actual = getUrlFromHTML(inputHTMLBody, inputBaseURl)
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
});

test('getUrlFromHTML  invalid', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="Invalid">
            Invalid URL
        </a> 
     
    </body>
</html>|
`
    const inputBaseURl = "https://blog.boot.dev"
    const actual = getUrlFromHTML(inputHTMLBody, inputBaseURl)
    const expected = []
    expect(actual).toEqual(expected)
});