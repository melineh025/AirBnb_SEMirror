from dateutil import parser
import json 
def xmasCache():
    christmas_rent=0.0
    christmas_count=0
    dataDir = "../../data/calendar12.json"
    with open(dataDir,mode='r',encoding='utf-8') as f:
        data = json.load(f)
        count = 0 
        for i in range(len(data)):
            d = parser.parse(data[i]['date'])
            if d.day>=18 and d.day >=31:
                if(data[i]['adjusted_price']!=""):
                    price = data[i]['adjusted_price']
                    price = price.replace(',','')
                    price = price.replace('$','')
                    if price!=0:
                        christmas_rent+=float(price)
                        christmas_count+=1
    if(christmas_count!=0):
        christmas_rent = christmas_rent/christmas_count
    else: 
        christmas_rent = 0

    with open("../../data/xmas.json",mode = 'w', encoding='utf-8') as n:
        dictionary = {"xmas_count":christmas_count,
                "xmas_rent":christmas_rent}
        data = json.dumps(dictionary,indent = 4)
        n.write(data)


def easterCache():
    easter_rent = 0.0
    easter_count = 0
    dataDir = "../../data/calendar4.json"
    with open(dataDir,mode='r',encoding='utf-8') as f:
        data = json.load(f)
        for i in range(len(data)):
            d = parser.parse(data[i]['date'])
            if d.day>=1 and d.day >=18:
                if(data[i]['adjusted_price']!=""):
                    price = data[i]['adjusted_price']
                    price = price.replace(',','')
                    price = price.replace('$','')
                    if price!=0:
                        easter_rent+=float(price)
                        easter_count+=1
    if(easter_count!=0):
        easter_rent = easter_rent/easter_count
    else:
        easter_rent = 0

    with open("../../data/easter.json",mode = 'w', encoding='utf-8') as n:
        dictionary = {"easter_count":easter_count,
                "easter_rent":easter_rent}
        data = json.dumps(dictionary,indent = 4)
        n.write(data)

def summerCache():
    summer_rent = 0.0
    summer_count = 0
    dataDirMonths = ["../../data/calendar6.json","../../data/calendar7.json", "../../data/calendar8.json"]
    for dataDir in dataDirMonths:
        with open(dataDir,mode='r',encoding='utf-8') as f:
            data = json.load(f)
            summer_count+=len(data)
            for i in range(len(data)):
                d = parser.parse(data[i]['date'])
                if(data[i]['adjusted_price']!=""):
                    price = data[i]['adjusted_price']
                    price = price.replace(',','')
                    price = price.replace('$','')
                    if price!=0:
                        summer_rent+=float(price)
                        summer_count+=1
    if(summer_count!=0):
        summer_rent = summer_rent/summer_count
    else:
        summer_rent = 0 

    with open("../../data/summer.json",mode = 'w', encoding='utf-8') as n:
        dictionary = {"summer_count":summer_count,
                "summer_rent":summer_rent}
        data = json.dumps(dictionary,indent = 4)
        n.write(data)

xmasCache()
easterCache()
summerCache()