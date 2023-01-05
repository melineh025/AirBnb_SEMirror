import csv 
import json
import time
from dateutil import parser

def csv_to_json(csvFilePath, jsonFilePath):
    jsonArray = []
      
    #read csv file
    with open(csvFilePath, encoding='utf-8') as csvf: 
        #load csv file data using csv library's dictionary reader
        csvReader = csv.DictReader(csvf) 

        #convert each csv row into python dict
        for row in csvReader: 
            #add this python dict to json array
            jsonArray.append(row)
  
    #convert python jsonArray to JSON String and write to file
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf: 
        jsonString = json.dumps(jsonArray, indent=4)
        jsonf.write(jsonString)
          
# csvFilePath = r'../../data/calendar.csv'
# jsonFilePath = r'../../data/calendar2.json'

# start = time.perf_counter()
# csv_to_json(csvFilePath, jsonFilePath)
# finish = time.perf_counter()

# print(f"Conversion 100.000 rows completed successfully in {finish - start:0.4f} seconds")

def calendar_json_by_month():
    f = open('../../data/calendar.json')
    data = json.load(f)
    jsonArray1 = []
    jsonArray2 = []
    jsonArray3 = []
    jsonArray4 = []
    jsonArray5 = []
    jsonArray6 = []
    jsonArray7 = []
    jsonArray8 = []
    jsonArray9 = []
    jsonArray10 = []
    jsonArray11 = []
    jsonArray12 = []
    for i in range(len(data)):
        date = parser.parse(data[i]['date'])
        if(date.month==1):
            jsonArray1.append(data[i])
        elif(date.month==2): 
            jsonArray2.append(data[i])
        elif(date.month==3): 
            jsonArray3.append(data[i])
        elif(date.month==4): 
            jsonArray4.append(data[i])
        elif(date.month==5): 
            jsonArray5.append(data[i])
        elif(date.month==6):
            jsonArray6.append(data[i])
        elif(date.month==7): 
            jsonArray7.append(data[i])
        elif(date.month==8): 
            jsonArray8.append(data[i])
        elif(date.month==9): 
            jsonArray9.append(data[i])
        elif(date.month==10): 
            jsonArray10.append(data[i])
        elif(date.month==11):
            jsonArray11.append(data[i])
        elif(date.month==12):
            jsonArray12.append(data[i])
        else:
            print(data[i])

    #convert python jsonArray to JSON String and write to file
    print(len(jsonArray1))
    with open('../../data/calendar1.json', 'w', encoding='utf-8') as jsonf: 
        jsonString = json.dumps(jsonArray1, indent=4)
        jsonf.write(jsonString)
    print(len(jsonArray2))
    with open('../../data/calendar2.json', 'w', encoding='utf-8') as jsonf: 
        jsonString = json.dumps(jsonArray2, indent=4)
        jsonf.write(jsonString)
    print(len(jsonArray3))
    with open('../../data/calendar3.json', 'w', encoding='utf-8') as jsonf: 
        jsonString = json.dumps(jsonArray3, indent=4)
        jsonf.write(jsonString)
    print(len(jsonArray4))
    with open('../../data/calendar4.json', 'w', encoding='utf-8') as jsonf: 
        jsonString = json.dumps(jsonArray4, indent=4)
        jsonf.write(jsonString)
    print(len(jsonArray5))
    with open('../../data/calendar5.json', 'w', encoding='utf-8') as jsonf: 
        jsonString = json.dumps(jsonArray5, indent=4)
        jsonf.write(jsonString)
    print(len(jsonArray6))
    with open('../../data/calendar6.json', 'w', encoding='utf-8') as jsonf: 
        jsonString = json.dumps(jsonArray6, indent=4)
        jsonf.write(jsonString)
    print(len(jsonArray7))
    with open('../../data/calendar7.json', 'w', encoding='utf-8') as jsonf: 
        jsonString = json.dumps(jsonArray7, indent=4)
        jsonf.write(jsonString)
    print(len(jsonArray8))
    with open('../../data/calendar8.json', 'w', encoding='utf-8') as jsonf: 
        jsonString = json.dumps(jsonArray8, indent=4)
        jsonf.write(jsonString)
    print(len(jsonArray9))
    with open('../../data/calendar9.json', 'w', encoding='utf-8') as jsonf: 
        jsonString = json.dumps(jsonArray9, indent=4)
        jsonf.write(jsonString)
    print(len(jsonArray10))
    with open('../../data/calendar10.json', 'w', encoding='utf-8') as jsonf: 
        jsonString = json.dumps(jsonArray10, indent=4)
        jsonf.write(jsonString)
    print(len(jsonArray11))
    with open('../../data/calendar11.json', 'w', encoding='utf-8') as jsonf: 
        jsonString = json.dumps(jsonArray11, indent=4)
        jsonf.write(jsonString)
    print(len(jsonArray12))
    with open('../../data/calendar12.json', 'w', encoding='utf-8') as jsonf: 
        jsonString = json.dumps(jsonArray12, indent=4)
        jsonf.write(jsonString)
                
calendar_json_by_month()





                


