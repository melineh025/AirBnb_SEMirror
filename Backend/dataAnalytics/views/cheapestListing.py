import json 
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

@csrf_exempt
def cheapest_listing(request):
    if request.method=='POST':
        try: 
            user_input = json.loads(request.body)
            room_type = user_input['room_type']
            min_price = user_input['min_price']
            if room_type == 0:
                room_type = "Private room"
            else: 
                room_type = "Entire home/apt"
            dataDir = "./data/listings.json"
            with open(dataDir,mode='r',encoding='utf-8') as f:
                data = json.load(f)
                data.sort(key=lambda x: x['price'])

            privateRoomData = [x for x in data if x['room_type']==room_type and x['price']>=min_price]
            outputDict={}
            if len(privateRoomData)<=10:
                # outputDict["numberOfListings"] = len(privateRoomData)
                for i in range(len(privateRoomData)):
                    outputDict[i+1] = privateRoomData[i]
            else:
                # outputDict["numberOfListings"] = 10
                for i in range(10):
                    outputDict[i+1] = privateRoomData[i]

            return JsonResponse(outputDict)
        except Exception as e: 
            return JsonResponse({"message": e})
    else:
        return JsonResponse({"message":"It should be a POST request."})
    



