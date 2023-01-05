from django.http import JsonResponse
import json
from dateutil import parser
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def add_listing(request):
    if request.method == 'POST':
        try:
            user_input = json.loads(request.body)
            date_analyze = parser.parse(user_input['date'])
            safe=False
            if user_input['price'][-3]=="." and user_input['adjusted_price'][-3]=="." :
                safe=True
            else:
                return JsonResponse({"code":404, "message":"price or adjusted_price are not in the right format ($XX.XX)"})
            
            if(safe):
                try: 
                    with open("./data/calendar.json",mode='r',encoding='utf-8') as f:
                        feeds = json.load(f)
                    with open("./data/calendar.json",mode='w',encoding='utf-8') as feedsjson:
                        entry={"listing_id":user_input['listing_id'],
                                "date": user_input['date'],
                                "available": user_input['available'],
                                "price": user_input['price'],
                                "adjusted_price":user_input['adjusted_price'],
                                "minimum_nights":user_input['minimum_nights'],
                                "maximum_nights":user_input['maximum_nights']}
                        feeds.append(entry)
                        json.dump(feeds, feedsjson)
                except Exception as e:
                    return JsonResponse({"code":404, "message":e})

                try: 
                    dataDir = "./data/calendar"+str(date_analyze.month)+".json"
                    with open(dataDir,mode='r',encoding='utf-8') as f2:
                        feeds2 = json.load(f2)
                    with open(dataDir,mode='w',encoding='utf-8') as feedsjson2:
                        feeds2.append(entry)
                        json.dump(feeds2,feedsjson2)
                except Exception as e: 
                    return JsonResponse({"code":404, "message": e})

            return JsonResponse({"code":200})
        except Exception as e:
            return JsonResponse({"code":404, "message":e})