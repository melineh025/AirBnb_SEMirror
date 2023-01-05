from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
from dateutil import parser
from django.views.decorators.csrf import csrf_exempt
import os.path


@csrf_exempt
def popular_months(request):
	if request.method == 'GET':

	#Month(key) and Booked(value)
		#check if website has been visited before
		#(or api has been run once)
		fileE= os.path.isfile('./data/newPopularMonths.json') 

		#do length computation if file does not exist
		if(not fileE):
			dict = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0}
			fileDir =  "./data/calendar.json"
			f = open(fileDir)
			data = json.load(f)

			for i in range(len(data)):
				date = parser.parse(data[i]['date'])
				isAvail = (data[i]['available'])
				if isAvail  ==  "f":
					count = dict[date.month]
					count = count + 1
					dict[date.month] = count
			
			bookingMonths = list(dict.values())

			#convert list to json 
			newBookingMonths = json.dumps(bookingMonths)
			 #incr analysis- Store top 10 in json file

			#if the url has not been clicked before
			with open('./data/newPopularMonths.json', 'w', encoding = 'utf-8') as f:
				#new file created with contents
				f.write(newBookingMonths)
				f.close()

		#api reads json file directly
		d = open('./data/newPopularMonths.json')
		data = json.load(d)
		
		return JsonResponse({'numberOfBookings':data})


def json_get(request):
	if request.method == 'GET':
		return JsonResponse({"name":"melineh"}) 