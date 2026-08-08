import requests, re
headers = {'User-Agent': 'Mozilla/5.0'}
q = 'crop recommendation india csv'
r = requests.get('https://html.duckduckgo.com/html/', params={'q': q}, headers=headers, timeout=20)
text = r.text
urls = re.findall(r'href=\"([^\"]+)\"', text)
print('DUCKDUCKGO LINKS', len(urls))
for u in urls:
    if any(x in u.lower() for x in ['csv','kaggle','github','drive.google.com','googleusercontent.com','data.world','archive.ics','figshare','raw.githubusercontent.com']):
        print(u)
print('DONE')
