import json 
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from collections import Counter
import codecs

#@csrf_exempt
def popular_neighborhoods(request):
    if request.method=='GET':
        try:
            dataDir = "./data/listings.json"
            areas = {}
            count = 0
            
            f = open(dataDir, mode = 'r', encoding = 'utf-8')
            data = json.load(f)

            for i in range(len(data)):
                tempNeighborhood = (data[i]['neighbourhood'])
                reviewFreq = (data[i]['number_of_reviews'])
                areas[tempNeighborhood] = count
                
                if(reviewFreq > 100):
                    count = areas[tempNeighborhood] + 1
                    areas[tempNeighborhood] = count
                        
            #k = Counter(areas)
            #top_ten = k.most_common(10)
            #top_ten = Counter(top_ten)
            #result = top_ten.keys()
            top_ten = sorted(areas, key=areas.get, reverse=True)[:10]
            return JsonResponse({"popular neighborhoods": top_ten})
 
        except Exception as e:
            return JsonResponse({"code": 404, "message":e})            
                    
                    
            
