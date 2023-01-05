from cmath import inf
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json 
from dateutil import parser
from django.views.decorators.csrf import csrf_exempt

# JSON BODY FORMAT - example: {"date":"2021-04-03"}
@csrf_exempt
def rent_post(request):
    if request.method == 'POST':
        try: 
            input_date = json.loads(request.body)
            input_date = parser.parse(input_date['date'])
            calendarDir = "./data/calendar"+str(input_date.month)+".json"
            f = open(calendarDir)
            data = json.load(f)
            averageRent = 0 
            maxRent = 0 
            minRent = inf
            count = 0 
            for i in range(len(data)):
                date = parser.parse(data[i]['date'])
                if(date.day == input_date.day and data[i]['adjusted_price']!=""):
                    count+=1
                    price = data[i]['adjusted_price']
                    price = price.replace(',','')
                    price = price.replace('$','')
                    price = int(price[:-3])
                    if(price!=0):
                        averageRent += price
                        maxRent = max(maxRent, price)
                        minRent = min(minRent, price)
            averageRent = averageRent/count
            return JsonResponse({"averageRent":averageRent, "maxRent": maxRent, "minRent": minRent, "code":200})
        except: 
            return JsonResponse({"code":404})

# def rent_post(input_date):
#     try: 
#         input_date = parser.parse(input_date['date'])
#         calendarDir = "./data/calendar"+str(input_date.month)+".json"
#         f = open(calendarDir)
#         data = json.load(f)
#         averageRent = 0 
#         maxRent = 0 
#         minRent = inf
#         count = 0 
#         for i in range(len(data)):
#             date = parser.parse(data[i]['date'])
#             if(date.day == input_date.day and data[i]['adjusted_price']!=""):
#                 count+=1
#                 price = data[i]['adjusted_price']
#                 price = price.replace(',','')
#                 price = price.replace('$','')
#                 price = int(price[::-3])
#                 if(price!=0):
#                     averageRent += price
#                     maxRent = max(maxRent, price)
#                     minRent = min(minRent, price)
#         averageRent = averageRent/count
#         return {"averageRent":averageRent, "maxRent": maxRent, "minRent": minRent, "code":200}
#     except: 
#         return {"code":400}

def json_get(request):
    if request.method == 'GET':
        return JsonResponse({"name":"julie"})

