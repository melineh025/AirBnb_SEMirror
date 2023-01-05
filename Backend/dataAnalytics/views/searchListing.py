from django.http import JsonResponse
import json
from dateutil import parser
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def search_listing(request):
    if request.method == "POST":
        try:
            user_input = json.loads(request.body)
            user_id = user_input['listing_id']
            date_analyze = parser.parse(user_input['date'])

            dataDir = "./data/calendar"+str(date_analyze.month)+".json"
            found = False
            with open(dataDir,mode='r',encoding='utf-8') as f:
                data = json.load(f)
                for i in range(len(data)):
                    d = parser.parse(data[i]['date'])
                    if data[i]['listing_id'] == user_id and d.day == date_analyze.day:
                        found = True
                        return JsonResponse({"code":200,
                                "listing_id":data[i]['listing_id'],
                                "date": data[i]['date'],
                                "available": data[i]['available'],
                                "price": data[i]['price'],
                                "adjusted_price":data[i]['adjusted_price'],
                                "minimum_nights":data[i]['minimum_nights'],
                                "maximum_nights":data[i]['maximum_nights']})
            if(not found):
                return JsonResponse({"code":204})
        except Exception as e: 
            return JsonResponse({"code":404, "message":e})
