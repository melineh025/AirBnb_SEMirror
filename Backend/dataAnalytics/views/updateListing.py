from django.http import JsonResponse
import json
from dateutil import parser
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def update_listing(request):
    if request.method == 'PUT':
        try:
            input = json.loads(request.body)
            safe = False
            if input['price'][-3]=="." and input['adjusted_price'][-3]=="." :
                safe = True
            else:
                return JsonResponse({"code":404, "message":"bad format"})
                
            user_ID = input['listing_id']
            date = parser.parse(input['date'])

            dataDir = './data/calendar' + str(date.month)+ '.json'

            if(safe):
                with open(dataDir, mode = 'r', encoding= 'utf-8') as f:
                    data = json.load(f)
                with open(dataDir, mode = 'w', encoding = 'utf-8') as n:
                    for i in range(len(data)):
                        check_date = parser.parse(data[i]['date'])
                    if data[i]['listing_id'] == userID and check_date.day == date.day:
                        temp_id = data[i]['listing_id']
                        del data[i]
                        new_entry =  {"listing_id": temp_id,
                                "date": input['date'],
                                "available": input['available'],
                                "price": input['price'],
                                "adjusted_price":input['adjusted_price'],
                                "minimum_nights":input['minimum_nights'],
                                "maximum_nights":input['maximum_nights']}	
                        n.append(new_entry)
                        json.dumps(data,n)
                        return JsonResponse({"code":200})
                return JsonResponse({"code:404", "message":"Listing not found"})
        except Exception as e:
            return JsonResponse({"code":404, "message":e})
