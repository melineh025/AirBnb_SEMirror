from django.http import JsonResponse
import json 
from dateutil import parser
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def christmas_rent(request):
    if request.method == 'GET':
        try:
            with open("./data/xmas.json",mode='r',encoding='utf-8') as f:
                data = json.load(f)
                christmas_rent = data['xmas_rent']
            return JsonResponse({"code":200,"christmas":christmas_rent})
        except Exception as e: 
            return JsonResponse({"code":404, "message":e})
        

def easter_rent(request):
    if request.method == 'GET':
        try:
            with open("./data/easter.json",mode='r',encoding='utf-8') as f:
                data = json.load(f)
                easter_rent = data['easter_rent']
            return JsonResponse({"code":200, "easter":easter_rent})
        except Exception as e: 
            return JsonResponse({"code":404, "message":e})
                
def summer_rent(request):
    if request.method=='GET':
        try: 
            with open("./data/summer.json",mode='r',encoding='utf-8') as f:
                data = json.load(f)
                summer_rent = data['summer_rent']
            return JsonResponse({"code":200, "summer":summer_rent})
        except Exception as e: 
            return JsonResponse({"code":404, "message":e})
