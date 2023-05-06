from rest_framework.serializers import ModelSerializer
from products.models import Product


class ProductSerializer(ModelSerializer):
    class Meta:
        fields = ("id", "name", "product", "image",)
        model = Product


class ProductDetailSerializer(ModelSerializer):
    class Meta:
        fields = ("id", "name", "image", "product", 'description')
        model = Product
        
        
class FavoriteSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = ("id", "name", "image", 'description')