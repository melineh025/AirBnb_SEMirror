from django.urls import URLPattern, path

from .views import test, rentSpecificDay,popularMonths,addListing,holidays,deleteListing,searchListing,listingPerRange, cheapestListing, popularNeighborhoods, mostRated

#URLConf
urlpatterns = [
    path('hello/',test.say_hello),
    path('json_get/',test.json_get),
    path('rentSpecificDay/',rentSpecificDay.rent_post),
    path('popularMonths/', popularMonths.popular_months),
    path('addListing/',addListing.add_listing),
    path('deleteListing/',deleteListing.delete_listing),
    path('searchListing/',searchListing.search_listing),
    path('xmasRent/',holidays.christmas_rent),
    path('easterRent/',holidays.easter_rent),
    path('summerRent/',holidays.summer_rent),
    path('listingPerRange/',listingPerRange.listingPerRange),
    path('cheapestListing/',cheapestListing.cheapest_listing),
    path('popularNeighborhoods/', popularNeighborhoods.popular_neighborhoods),
    path('mostRated/', mostRated.mostRated)
]
