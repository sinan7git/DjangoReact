from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render, get_object_or_404
from api.v1.products.serializers import ProductSerializer, ProductDetailSerializer,FavoriteSerializer
from products.models import Product


@api_view(["GET"])
def products(request):
    instances = Product.objects.filter(is_deleted=True)
    context = {
        "request": request
    }
    serializer = ProductSerializer(instances, many=True, context=context)
    response_data = {
        "status_code": 6000,
        "data": serializer.data
    }
    

    return Response(response_data)


@api_view(["GET"])
def product(request, pk):
    if Product.objects.filter(pk=pk).exists():
        instance = Product.objects.get(pk=pk)
        context = {
            "request": request
        }
        serializer = ProductDetailSerializer(instance, context=context)
        response_data = {
        "status_code": 6000,
        "data": serializer.data
    }
        return Response(response_data)
    else:
        response_data = {
            "status_code": 6001,
            "message": "Place not exist"
        }
        return Response(response_data)


@api_view(["GET"])

def favorites(request):
    instances = Product.objects.filter(is_favorite=True)
    context = {
        "request": request
    }
    serializer = FavoriteSerializer(instances, many=True, context=context)
    
    response_data = {
        "status_code": 6000,
        "data": serializer.data
    }
    return Response(response_data)
@api_view(["POST"])
def add_favorites(request,pk):
    instance = get_object_or_404(Product, pk=pk)
    serializer = FavoriteSerializer(instance, data=request.data, partial=True)
    
    if serializer.is_valid():
        serializer.save(is_favorite=True)
        return Response({"status_code": 600, "message": "Added to favorites"})
    return Response({"status_code": 601, "message": "Validation error", "data": serializer.errors})