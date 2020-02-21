import datetime
import requests
from bs4 import BeautifulSoup

_UTM_MOBILE_EVENTS = "https://m.utm.utoronto.ca/events.php?"

def extractEvents(html: str, parser: str = "lxml") -> dict: 
    if html == "":
        return {}

    soup = BeautifulSoup(html, parser)
    table = soup.table

    if not table:
        return {}

    tableValues = table.findAll("div")
    if len(tableValues) == 0:
        return {}

    times = list(map(lambda x: x.text, tableValues[0::2]))
    events = list(map(lambda x: x.text, tableValues[1::2]))
    return dict(zip(times, events))

def query(building: str, room: str) -> str:
    date = datetime.datetime.now()
    query = {
        "building_cd": building,
        "room_id": room,
        "yyyy": date.year,
        "mm": date.month,
        "dd": date.day 
    }
    response = requests.get(_UTM_MOBILE_EVENTS, params=query)
    if response.ok:
        response.close()
        return response._content
    response.close()
    return ""

def dateParser(date):
    start, end = date.split(" - ")
    return start, end

def getEvents(building: str, room: str):
    eventData = extractEvents(query(building, room))
    data = []
    for time, eventName in eventData.items():
        event = {}
        event['start_time'], event['end_time'] = dateParser(time)
        event['event_name'] = eventName
        data.append(event)
    return data