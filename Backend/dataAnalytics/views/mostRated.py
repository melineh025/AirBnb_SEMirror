import json 
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

@csrf_exempt
def mostRated(request):
    if request.method=='POST':
        try: 
            with open("./data/mostRated.json",mode='r',encoding='utf-8') as f:
                data = json.load(f)
            user_input = json.loads(request.body)
            neighbourhood = user_input['neighbourhood']
            returnDict = data[neighbourhood]
            return JsonResponse(returnDict)
        except Exception as e: 
            return JsonResponse({"message": e})
    else:
        return JsonResponse({"message":"It should be a POST request."})
    