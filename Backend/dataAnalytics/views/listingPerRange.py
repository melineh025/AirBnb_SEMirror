from calendar import month
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def listingPerRange(request):
    if request.method == 'POST':
        try:
            input = json.loads(request.body)
            month = input['month']
            dataDir = './data/calendar'+str(month)+'.json'
            count0to29= 0
            count30to59 = 0
            count60to99 = 0
            count100to199 = 0
            count200to299 = 0
            count300to399 = 0
            count400to599 = 0
            count600to799 = 0
            count800to999 = 0
            count1000 = 0
            prev_listing_id = ""
            with open(dataDir, mode='r',encoding='utf-8') as f:
                data = json.load(f)
                for i in range(len(data)):
                    current_listing_id = data[i]['listing_id']
                    if current_listing_id != prev_listing_id:
                        prev_listing_id = current_listing_id
                    else:
                        continue
                    
                    priceString = data[i]['adjusted_price']
                    priceString = priceString[1:]
                    priceString = priceString.replace(',','')
                    if len(priceString) <= 0: continue
                    priceVal = float(priceString)
                    if priceVal < 30:
                        count0to29 += 1
                    elif priceVal < 60:
                        count30to59 += 1
                    elif priceVal < 100:
                        count60to99 += 1
                    elif priceVal < 200:
                        count100to199 += 1
                    elif priceVal < 300:
                        count200to299 += 1
                    elif priceVal < 400:
                        count300to399 += 1
                    elif priceVal < 600:
                        count400to599 += 1
                    elif priceVal < 800:
                        count600to799 += 1
                    elif priceVal < 1000:
                        count800to999 += 1
                    elif priceVal >= 1000:
                        count1000 += 1
            
            return JsonResponse({"code": 200, "0to29": count0to29, "30to59": count30to59, "60to99": count60to99, "100to199": count100to199, "200to299": count200to299, "300to399": count300to399, "400to599": count400to599, "600to799": count600to799, "800to999": count800to999, "1000": count1000})
        except Exception as e:
            return JsonResponse({"code": 404, "message":e})

            