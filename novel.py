from urllib.parse import quote
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from pyquery import PyQuery as pq

import pymongo

MONGO_URL = 'mongodb://localhost:27017/'
MONGO_DB = 'novel'
MONGO_COLLECTION = 'novelInfo'
client = pymongo.MongoClient(MONGO_URL)
db = client[MONGO_DB]

# browser = webdriver.Chrome()
chrome_option = webdriver.ChromeOptions()
p = r'C:\Users\mhr\AppData\Local\Google\Chrome\User Data\Default'
chrome_option.add_experimental_option('excludeSwitches', ['enable-automation'])  # 以开发者模式
chrome_option.add_argument('--user-data-dir=' + p)
chrome_option.add_argument("--disable-blink-features")
chrome_option.add_argument("--disable-blink-features=AutomationControlled")

browser = webdriver.Chrome(options=chrome_option)
# 打开两个Tab
browser.switch_to.new_window('info')
TabWindows = browser.window_handles
browser.switch_to.window(TabWindows[0])


# 反爬
browser.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
            "source": """          
                    Object.defineProperty(navigator, 'webdriver', {
                        get: () => undefined
                        })
                    """})


wait = WebDriverWait(browser, 10)

# 常量
WEBSITE = {"qidian":"https://www.qidian.com/all/","feilu":"https://b2.faloo.com/y_0_1.html"}
BOOKDEATILURL =  [ "https://book.qidian.com/info/",  "https://b2.faloo.com/"]
CSS_SELECTOR = {'qidianPageInput': '.lbf-pagination-input',
                'qidianPageSubmit': '.lbf-pagination-go',
                'qidianPageCurrent':'.lbf-pagination-page  .lbf-pagination-current',
                'qidianBookBlock': '.all-book-list',
                'qidianBookList': '#book-img-text > ul > li',
                'feiluPageInput':'',
                'feiluPageSubmit':' .pageliste_body a:last-child',
                'feiluBookBlock' : '#BookContent',
                'feiluPageCurrent':'.pagelist_curr',
                'feiluBookList': '#BookContent .TwoBox02_01'
                }
# 暂定爬取 起点小说网
RUNINGARGS = ['qidian','feilu']


# 传入需要爬取的页面，站点索引（是起点小说网， 还是其他小说网）
def index_page(page,siteName):
    print('正在爬取',siteName, '小说网书库(默认)，第',page,'页')
    try:
        url = WEBSITE[siteName]
        browser.get(url)
        if page == 1:
            wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, CSS_SELECTOR[siteName + 'BookBlock'])))
            get_QidianNovelInfo(RUNINGARGS[0])
        elif page > 1:
            # 跳转
            input = wait.until(  EC.presence_of_element_located((By.CSS_SELECTOR,CSS_SELECTOR[siteName + 'PageInput'])))
            submit = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR,CSS_SELECTOR[siteName + 'PageSubmit'])))
            input.clear()
            input.send_keys(page)
            submit.click()
            # 判断当前页
            #wait.until(EC.text_to_be_present_in_element((By.CSS_SELECTOR,CSS_SELECTOR[siteName+'PageCurrent']),str(page)))
            # 判断信息块是否加载成功
            wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,CSS_SELECTOR[siteName + 'BookBlock'])))
            # 获取图书信息
            get_QidianNovelInfo(RUNINGARGS[0])
    except TimeoutException:
        print('timeout异常')
        index_page(page,RUNINGARGS[0])

# 起点
def get_QidianNovelInfo(siteName):
    print('获取图书信息...')
    html = browser.page_source
    doc = pq(html)
    items = doc(CSS_SELECTOR[siteName + 'BookList']).items()
    for item in items:
        item_url = item.find('div.book-img-box > a').attr('href').replace("//","")
        item_id = item_url.split('/')[-2]
        novel = {
            'book_url':item_url,
            'book_id':item_id,
            'image':item.find('.book-img-box  img').attr('src').replace("//","http://"),
            'title':item.find('.book-mid-info h2 a').text(),
            'author':item.find('.book-mid-info .author .name').text(),
            'type':item.find('.book-mid-info .author > a:nth-child(4)').text(),
            'sub-type':item.find('.book-mid-info .go-sub-type').text(),
            'status':item.find('.book-mid-info > p.author > span').text(),
            'intro':item.find('.book-mid-info > p.intro').text(),
            # 'bookDetail':get_QidianDetailInfo(item_url)
            'bookDetail': {'data':'','tag':'','textCount':''}
        }

        print(novel)
        save_to_mongo(novel)

def get_QidianDetailInfo(bookUrl,siteName='qidian'):
    # 有验证
    print('获取详细信息..')
    browser.switch_to.window(TabWindows[-1])
    browser.get("https://"+ bookUrl)

    # 滑块
    # try:
    #     block = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '#tcWrap')))
    # except:
    #     block = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.wrap')))

    html = browser.page_source
    doc = pq(html)
    mainContent = doc('.book-info')
    novelDetail =  {
        'authorSpaceUrl': mainContent.find('.writer').attr('href'),
        'tag': mainContent.find('.blue').text() + mainContent.find('.tag-wrap tags').text(),
        'num': mainContent.find(' div.book-info > p:nth-child(4)').text()
        # 'TextNum':mainContent.find('.book-info > p:nth-child(4) > em:nth-child(1)').text() + mainContent.find('.book-info > p:nth-child(4) > cite:nth-child(2)').text(),
        # 'recommendTotalNum':mainContent.find('.book-info > p:nth-child(4) > em:nth-child(4)').text() + mainContent.find('.book-info > p:nth-child(4) > cite:nth-child(5)').text(),
    }
    browser.switch_to.window(TabWindows[0])
    return novelDetail

# 飞卢

# 比较逆天的是飞卢小说网并没有通过input 来跳转网页
def index_pageFeilu(page,siteName):
    print('正在爬取',siteName, '小说网书库(默认)，第',page,'页')
    try:
        if page == 1:
            wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, CSS_SELECTOR[siteName + 'BookBlock'])))
            get_FeiluNovelInfo(RUNINGARGS[1])
        elif page > 1:
            # 跳转
            submit = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR,CSS_SELECTOR[siteName + 'PageSubmit'])))
            submit.click()
            # 判断信息块是否加载成功
            wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,CSS_SELECTOR[siteName + 'BookBlock'])))
            # 获取图书信息
            get_FeiluNovelInfo()
    except TimeoutException:
        print('timeout异常')
        index_page(page,RUNINGARGS[1])

def get_FeiluNovelInfo(siteName='feilu'):
    print('获取图书信息...')
    html = browser.page_source
    doc = pq(html)
    items = doc(CSS_SELECTOR[siteName + 'BookList']).items()
    for item in items:
        item_url = item.find('.TwoBox02_03 > a').attr('href').replace("//","")
        item_id = item_url.split('/')[-1].split('.')[0]
        detail  = get_FeiluDetailInfo(item_url)
        novel = {
            'book_url':item_url,
            'book_id':item_id,
            'image':item.find('.TwoBox02_03  .TYImg').attr('src'),
            'title': detail['title'],
            'author':detail['author'],
            'type':detail['type'],
            # 需要在书籍详情中获取
            'sub-type':detail['sub-type'],
            'status':detail['status'],
            # 介绍
            'intro':item.find(' div.TwoBox02_04 > div.TwoBox02_06 a ').text(),
            'bookDetail': {
                'data':detail['data'],
                'tag': detail['tags'],
            'textCount':detail['textCount']
        }
        }
        print(novel)
        save_to_mongo(novel)


def get_FeiluDetailInfo(bookUrl,siteName='feilu'):
    # 有验证
    print('获取详细信息..')
    browser.switch_to.window(TabWindows[-1])
    browser.get("https://"+ bookUrl)
    html = browser.page_source
    doc = pq(html)
    mainContent = doc('.center')
    items =  mainContent.find('.T-L-O-Z-Box2 .colorQianHui.mgLeft20').items()
    data = ''
    for item in items:
        data += item.text()
        data += "\t"

    tags = mainContent.find(' div.T-R-T-B2-Box1 > span.colorQianHui ~ a').items()
    tagStr = ''
    for titem in tags:
        tagStr += titem.text()
        tagStr += "\t"

    textCount =  mainContent.find('div.T-R-Middle > div:nth-child(2) span').items()
    textStr = ''
    for textItem in textCount:
        textStr += textItem.text()

    novelDetail =  {
        'title': mainContent.find('#novelName').text(),
        'author': mainContent.find('.T-L-O-Z-Box1 a.fs14.colorQianHui.pdLeft10 ').text(),
        'type':mainContent.find('div.T-R-T-Box2 > div:nth-child(2) > span > span > a').text(),
        'data':data,
        'status': mainContent.find("div.T-R-Md-Bobx1.txtCenter > span").text(),
        'sub-type': mainContent.find(' div.Two-Right > div.T-R-Top > div.T-R-T-Box2 > div:nth-child(3) > span > a').text(),
        'tags':tagStr,
        'textCount': textStr
    }
    browser.switch_to.window(TabWindows[0])
    return novelDetail

def save_to_mongo(result):
    try:
        if db[MONGO_COLLECTION].insert_one(result):
            print('存储成功')
    except Exception:
        print('存储失败')

MAX_PAGE = 5

def startFeiluApp():
    siteName = 'feilu'
    url = WEBSITE[siteName]
    browser.get(url)
    for i in range(1, MAX_PAGE + 1):
        index_pageFeilu(i,RUNINGARGS[1])

def startQidianApp():
    siteName = 'qidian'
    for i in range(1, MAX_PAGE + 1):
        index_page(i,RUNINGARGS[0])


if __name__ == '__main__':
    startFeiluApp()
    startQidianApp()

