from bs4 import BeautifulSoup
import urllib.request

def extractEvents(html, parser = "lxml"):
    soup = BeautifulSoup(html, parser)
    table = soup.table
    tableValues = table.findAll("div")
    times = list(map(lambda x: x.text, tableValues[0::2]))
    events = list(map(lambda x: x.text, tableValues[1::2]))
    return dict(zip(times, events))

def parseLink(link):
    fp = urllib.request.urlopen(link)
    site = fp.read().decode("utf8")
    fp.close()
    return site