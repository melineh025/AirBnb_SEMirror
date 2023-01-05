import json

def mostRated():
    neighborhoods = {}
    numNeighborhood = {}
    dataDir = "../../data/listings.json"
    with open(dataDir,mode='r',encoding='utf-8') as f:
        data = json.load(f)
        data.sort(key=lambda x: int(x['number_of_reviews']), reverse=True)
        for i in range(len(data)):
            if neighborhoods.get(data[i]['neighbourhood']) == None:
                numNeighborhood[data[i]['neighbourhood']] = int(1)
                neighborhoods[data[i]['neighbourhood']] = {}
                neighborhoods[data[i]['neighbourhood']][numNeighborhood[data[i]['neighbourhood']]] = data[i]
            elif numNeighborhood[data[i]['neighbourhood']] < 10:
                numNeighborhood[data[i]['neighbourhood']] += 1
                neighborhoods[data[i]['neighbourhood']][numNeighborhood[data[i]['neighbourhood']]] = data[i]
    
    with open("../../data/mostRated.json",mode = 'w', encoding='utf-8') as n:
        data = json.dumps(neighborhoods,indent = 4)
        n.write(data)


mostRated()