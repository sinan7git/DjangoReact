from django.urls import path
from api.v1.products import views


urlpatterns = [
    path('', views.products),
    path("add_favorites/<int:pk>",views.add_favorites),
    path("favorites/",views.favorites),
    path('view/<int:pk>', views.product),
]
