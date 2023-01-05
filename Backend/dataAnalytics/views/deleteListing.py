from django.http import JsonResponse
import json
from dateutil import parser
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def delete_listing(request):
    if request.method == 'POST':
        try:
            input = json.loads(request.body)
            user_input = input['listing_id']
            date = parser.parse(input['date'])

            dataDir = './data/calendar'+str(date.month)+'.json'
            with open(dataDir, mode='r',encoding='utf-8') as f:
                data = json.load(f)
            with open(dataDir, mode='w', encoding='utf-8') as n:
                for j in range(len(data)):
                    d = parser.parse(data[j]['date'])
                    if data[j]['listing_id'] == user_input and d.day == date.day:
                        del data[j]
                        json.dump(data, n)
                        return JsonResponse({"code": 200})
            return JsonResponse({"code":404, "message":"Listing not found"})
        except Exception as e:
            return JsonResponse({"code": 404, "message":e})


